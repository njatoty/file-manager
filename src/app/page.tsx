"use client"
import { ChangeEvent, ChangeEventHandler, DragEvent, useEffect, useRef, useState } from 'react'
import FolderItem from './components/FolderItem';
import NewFolder from './components/NewFolder';
import FileItem from './components/FileItem';
import { ArrowLeftIcon, ArrowUpIcon, DeleteFolderIcon, GridViewIcon, ListViewIcon, NewFolderIcon, RefreshIcon, UploadFileIcon, UploadFolderIcon, getPathFromPublic, sortByType } from './utils/utils';
import FileInProgress from './components/FileInProgress';
import { randomUUID } from 'crypto';

export default function Home() {
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [breadCrumbs, setBreadCrumbs] = useState<Array<Folder>>([]);
  const [selectedFolders, setSelectedFolders] = useState<Array<Folder>>([]);
  const [foldersInProgress, setFoldersInProgress] = useState<Array<Folder>>([]);
  const [isOpenNewFolderForm, setIsOpenNewFolderForm] = useState(false);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isLargeIcon, setIsLargeIcon] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [playedFile, setPlayedFile] = useState<Folder | null>(null);
  const importFilesRef = useRef<HTMLInputElement>(null);
  const importFoldersRef = useRef<HTMLInputElement>(null);


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
    setIsRefreshing(true);
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
      
      // unselect all folders
      setSelectedFolders([]);
      
    }).catch(err => {
      console.error(err)
    }).finally(() => setIsRefreshing(false));
  }
  
  const backFolder = (folder?: Folder) => {
    setIsRefreshing(true);
    fetch(`/api/folders?path=${folder?.parent}`).then(async data => {
      const folders: Folder = await data.json();
      setCurrentFolder(folders);
      // pop breadcrumbs
      setBreadCrumbs(prev => {
        const newArray = [...prev];
        newArray.pop();
        return newArray;
      });
      // unselect all folders
      setSelectedFolders([]);
      
    }).catch(err => {
      console.error(err)
    }).finally(() => setIsRefreshing(false));

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

  function uploadFiles(files: FileList) {
    
    if (files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++)
      formData.append("files[]", files[i]);
    
    formData.append('destination', currentFolder?.path!);
    fetch('/api/folders/upload', {
      method: 'post',
      body: formData
    }).then(async res => {
      let response = await res.json();
      if (response.ok) {
        const folderInfos: any[] = response.folderInfos;
        console.log(response)
        folderInfos.forEach(folder => {
          const folderInfo: Folder = folder.folderInfo;
          // populate uploaded file=>in view
          if (!folder.wasExisted) {
            setCurrentFolder(prev => (
              {...prev!, children: [...prev?.children!, folderInfo]}
            ));
          } else {
            console.log('A file has been overriden!')
          }

          // remove files in progress
          setFoldersInProgress(prev => prev.filter(fld => fld.name !== folder.name));

        });
      }

    }).catch(err => {
      console.error(err);
    }).finally(() => setIsDragEnter(false));
  } 

  function handleDropFile(event: DragEvent) {
    event.preventDefault();
    uploadFiles(event.dataTransfer.files);
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragEnter(true);
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    setIsDragEnter(false);
    
    const files = event.dataTransfer.files;
    console.log(files)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setFoldersInProgress(prev => [...prev, {
        id: randomUUID(),
        name: file.name,
        isDirectory: false,
        isRoot: false,
        children: [],
        path: '',
      }]);
    }
  };
  
  const handleImportFolders = () => {
      importFoldersRef.current?.click();
  } 
  
  const handleImportFiles = () => {
    importFilesRef.current?.click();
  } 
  
  function handleChangeImportFolders(event: ChangeEvent<HTMLInputElement>) {
    
    const files = (event.target.files!) || null;
    if (files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
      formData.append("relativePaths[]", files[i].webkitRelativePath);
    }
    
    formData.append('destination', currentFolder?.path!);
    
    fetch('/api/folders/upload/from-folders', {
      method: 'post',
      body: formData
    }).then(async res => {
      let response = await res.json();
      if (response.ok) {
        const folderInfo: Folder = response.folderInfo;
        // populate uploaded file=>in view
        setCurrentFolder(prev => (
          {...prev!, children: [...prev?.children!, folderInfo]}
        ));
      } else {
        console.error(response.message)
      }

    }).catch(err => {
      console.error(err);
    })

  } 

  // read image, video
  function handleReadFile(folder: Folder) {
    setIsReading(true);
    setPlayedFile(folder);
  }
  function handleCloseReadFile() {
    setIsReading(false);
    setPlayedFile(null);
  }

  
  function handleChangeImportFiles(event: ChangeEvent<HTMLInputElement>) {
    uploadFiles(event.target.files!);
  } 

  return (
    <main className="flex min-h-screen flex-col justify-start gap-2 p-2 md:p-12 xl:p-24 relative">
      <div className={`flex flex-col min-h-screen p-2 border-2 border-dashed ${isDragEnter ? 'border-gray-800' : 'border-transparent'}`}
        onDrop={handleDropFile} onDragOver={handleDragOver} onDragEnd={handleDragEnd}
        onDragEnter={() => setIsDragEnter(true)} onDragLeave={() => setIsDragEnter(false)}
      >
        <div className="w-full explorer-menu">
          
          {/* Refresh button */}
          <button onClick={() => clickFolder(currentFolder!)} disabled={isRefreshing}>
            <img src={RefreshIcon} alt="" />
            <span>Actualiser</span>
          </button>
          
          {/* Import folders button */}
          <button onClick={handleImportFolders}>
            <img src={UploadFolderIcon} alt="" />
            <span>Importer dossier</span>
            {/* @ts-expect-error */}
            <input type="file" ref={importFoldersRef} className='hidden' hidden webkitdirectory="true"
            onChange={handleChangeImportFolders}  />
          </button>
          
          {/* Import files button */}
          <button onClick={handleImportFiles}>
            <img src={UploadFileIcon} alt="" />
            <span>Importer fichiers</span>
            <input type="file" ref={importFilesRef} hidden className='hidden' multiple onChange={handleChangeImportFiles} />
          </button>
          <button onClick={() => setIsLargeIcon(!isLargeIcon)}>
            {
              isLargeIcon ?
              <>
                <img src={ListViewIcon} alt="" />
                <span>Petit icon</span>
              </> :
              <>
                <img src={GridViewIcon} alt="" />
                <span>Grande icon</span>
              </>
            }
          </button>
        </div>
        <div className="flex gap-2 w-full items-stretch">
          {/* Move to parent folder button */}
          {
            (currentFolder && currentFolder.path && !currentFolder.isRoot) &&
            <button
              className='border border-gray-800 p-1 px-2 text-sm hover:bg-emerald-950 flex-1 min-w-10'
              onClick={() => backFolder(currentFolder)}
            >
              <div className='w-full h-full'
              style={{
                backgroundImage: `url(${ArrowLeftIcon})`,
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
        
        <div className={`flex ${isLargeIcon ? 'flex-row flex-wrap gap-1 justify-self-auto' : 'flex-col gap-[1px] justify-start'} my-2`}>
          {
            isOpenNewFolderForm && <NewFolder onCreateFolder={createNewFolder} isLargeIcon={isLargeIcon} />
          }
          {
            currentFolder && sortByType(currentFolder.children).map((folder, i) => 
              folder.isDirectory ? 
              <FolderItem key={folder.id} folder={folder} index={i}
                onOpenFolder={() => clickFolder(folder)}
                onRenameFolder={renameFolder}
                onSelect={selectFolder}
                isLargeIcon={isLargeIcon}
              /> :
              <FileItem key={folder.id} folder={folder} index={i}
                onRenameFolder={renameFolder}
                onSelect={selectFolder}
                isLargeIcon={isLargeIcon}
                onRead={handleReadFile}
              />
            )
          }

          {/* Show files in progress (upload) */}
          {
            foldersInProgress.map((folder, index) =>
              <FileInProgress key={`in-progress-${index}`} folder={folder} />
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
      {
        isReading && 
        <div className="explorer-modal">
          <div className='explorer-body'>
            <button className="close" onClick={handleCloseReadFile}>X</button>
            { playedFile && <iframe src={getPathFromPublic(playedFile.path!)} frameBorder="0" className='w-full'></iframe>}
          </div>
        </div>
      }
    </main>
  )
}
