"use client"
import { DragEvent, useEffect, useState } from 'react'
import FolderItem from './components/FolderItem';
import NewFolder from './components/NewFolder';
import FileItem from './components/FileItem';
import { ArrowUpIcon, DeleteFolderIcon, NewFolderIcon, sortByType } from './utils/utils';

export default function Home() {
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [breadCrumbs, setBreadCrumbs] = useState<Array<Folder>>([]);
  const [selectedFolders, setSelectedFolders] = useState<Array<Folder>>([]);
  const [folderName, setFolderName] = useState('');
  const [isOpenNewFolderForm, setIsOpenNewFolderForm] = useState(false);
  const [isDragEnter, setIsDragEnter] = useState(false);

  useEffect(() => {
    fetch(`/api/folders`).then(async data => {
      const folders: Folder = await data.json();
      setCurrentFolder(folders);
      // get source
      setBreadCrumbs([folders]);
    }).catch(err => {
      console.error(err)
    });
  }, [])

  const clickFolder = (folder: Folder, fromBreadCrumbs?: boolean) => {
    fetch(`/api/folders?path=${folder?.path}`).then(async data => {
      const folder: Folder = await data.json();
      setCurrentFolder(folder);
      // while clicking on the breadcrumbs
      if (fromBreadCrumbs) {
        let indexOfActiveFolder = breadCrumbs.findIndex(e => e.name === folder.name!);
        setBreadCrumbs(prev => {
          const newArray = prev.slice(0, indexOfActiveFolder + 1);
          return newArray;
        })
      }
      // push breadcrumbs
      if (!breadCrumbs.some(bc => bc.name === folder.name))
        setBreadCrumbs(prev => [...prev, folder]);
    }).catch(err => {
      console.error(err)
    });
  }
  
  const backFolder = (folder?: Folder) => {
    fetch(`/api/folders?path=${folder?.parent}`).then(async data => {
      const folders: Folder = await data.json();
      setCurrentFolder(folders);
      // pop breadcrumbs
      setBreadCrumbs(prev => {
        const newArray = [...prev];
        newArray.pop();
        return newArray;
      });
    }).catch(err => {
      console.error(err)
    });

  }

  function createNewFolder(folderName: string) {
    fetch(`/api/folders/create`, {
      method: 'post',
      body: JSON.stringify({
        folderPath: currentFolder?.path,
        folderName: folderName
      })
    }).then(async res => {
      let response: FolderResp = await res.json();
      if (response.ok) {
        // append the new folder into the page
        let folderInfo: Folder = response.folderInfo;
        setCurrentFolder(prev => (
          {...prev!, children: [...prev?.children!, folderInfo]}
        ));
        setFolderName('');
        setIsOpenNewFolderForm(false);
      } else {
        alert(response.message)
      }
    }).catch(err => {
      console.log(err)
    });
  }

  
  function renameFolder(folder: Folder, folderName: string) {
    let folderPath = folder.path;
    // if name not change
    if (folderName === folder.name) return;

    fetch('/api/folders/update', {
      method: 'post',
      body: JSON.stringify({
        folderPath: folder.parent!,
        oldName: folder.name,
        newName: folderName
      })
    }).then(async res => {
      let response: FolderResp = await res.json();
      if (response.ok) {
        // append the new folder into the page
        let folderInfo: Folder = response.folderInfo;
        setCurrentFolder(prev => (
          {...prev!, children: [...prev?.children!].map(ch => ch.path === folderPath ? 
            folderInfo : ch
          )}
        ));
      } else {
        alert(response.message)
      }
    }).catch(err => {
      console.log(err);
    })
  }

  function selectFolder(folder: Folder, isSelected: boolean) {
    if (isSelected) { // add selected folder in the array
      setSelectedFolders(prev => [...prev, folder]);
    } else { // Remove diselected folder
      setSelectedFolders(prev => prev.filter(f => f.name !== folder.name));
    }
  }

  function deleteFolders()  {
    fetch('/api/folders/remove', {
      method: 'delete',
      body: JSON.stringify({selectedFolders})
    }).then(async res => {
      let response = await res.json();
      if (response.ok) {
        // refresh folder
        clickFolder(currentFolder!);
      }
    })
  }

  function handleDropFile(event: DragEvent) {
    event.preventDefault();
    const file = (event.dataTransfer.files?.[0] as File) || null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append('destination', currentFolder?.path!);
    fetch('/api/folders/upload', {
      method: 'post',
      body: formData
    }).then(async res => {
      let response = await res.json();
      if (response.ok) {
        // populate uploaded file in view
        if (!response.wasExisted) {
          let folderInfo: Folder = response.folderInfo;
          setCurrentFolder(prev => (
            {...prev!, children: [...prev?.children!, folderInfo]}
          ));
        } else {
          console.log('file has been overrided!')
        }
      }

    }).catch(err => {
      console.error(err);
    })
    setIsDragEnter(false);
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragEnter(true);
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    setIsDragEnter(false);
  };
  

  return (
    <main className="flex min-h-screen flex-col justify-start gap-2 p-24">
      <div className={`flex flex-col min-h-screen p-2 border-2 border-dashed ${isDragEnter ? 'border-gray-800' : 'border-transparent'}`}
        onDrop={handleDropFile} onDragOver={handleDragOver} onDragEnd={handleDragEnd}
        onDragEnter={() => setIsDragEnter(true)} onDragLeave={() => setIsDragEnter(false)}
      >
        <div className="flex gap-2 w-full items-stretch">
          {
            (currentFolder && currentFolder.path && !currentFolder.isRoot) &&
            <button
              className='border border-gray-800 p-1 px-2 text-sm hover:bg-emerald-950 flex-1 min-w-10'
              onClick={() => backFolder(currentFolder)}
            >
              <div className='w-full h-full'
              style={{
                backgroundImage: `url(${ArrowUpIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
            </button>
          }
          <div className='flex items-center gap-2 w-full border border-gray-800 p-1 px-2'>
            {
              breadCrumbs.map((bc, index) => <button key={`${bc.id}-${index}`} onClick={() => clickFolder(bc, true)} className='text-sm breadcrumbs'>{bc.name}</button>)
            }
          </div>
          {/* New Folder Button */}
          <button
            className='border border-gray-800 p-1 px-2 text-sm hover:bg-emerald-950 flex-1 min-w-10'
            onClick={() => setIsOpenNewFolderForm(true)}
          >
            <div className='w-full h-full'
            style={{
              backgroundImage: `url(${NewFolderIcon})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </button>
          {/* Delete Folder Button */}
          {
            selectedFolders.length > 0 && 
            <button className='border border-gray-800 p-1 px-2 text-sm hover:bg-emerald-950 flex-1 min-w-10'
              onClick={deleteFolders}
            >
              <div className='w-full h-full'
              style={{
                backgroundImage: `url(${DeleteFolderIcon})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
            </button>
          }
        </div>
        
        <div className="flex flex-col justify-start gap-0 my-2">
          {
            isOpenNewFolderForm && <NewFolder onCreateFolder={createNewFolder} />
          }
          {
            currentFolder && sortByType(currentFolder.children).map((folder, i) => 
              folder.isDirectory ? 
              <FolderItem key={folder.id} folder={folder} index={i}
                onOpenFolder={() => clickFolder(folder)}
                onRenameFolder={renameFolder}
                onSelect={selectFolder}
              /> :
              <FileItem key={folder.id} folder={folder} index={i}
                onRenameFolder={renameFolder}
                onSelect={selectFolder}
              />

            )
          }
          
          {
            (currentFolder && currentFolder.children.length === 0) &&
            <button className='p-3 text-gray-600 text-sm'>
              Aucuns données
            </button>
          }
        </div>

      </div>
    </main>
  )
}
