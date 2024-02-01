"use client"
import { useEffect, useState } from 'react'
import FolderItem from './components/FolderItem';

export default function Home() {
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [breadCrumbs, setBreadCrumbs] = useState<Array<Folder>>([]);
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    fetch(`/api/folders`).then(async data => {
      const folders: Folder = await data.json();
      setCurrentFolder(folders);
      console.log(folders)
    }).catch(err => {
      console.error(err)
    });
  }, [])

  const clickFolder = (folder: Folder) => {
    fetch(`/api/folders?path=${folder?.path}`).then(async data => {
      const folder: Folder = await data.json();
      setCurrentFolder(folder);
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
      if (!breadCrumbs.some(bc => bc.name === folder?.name)) {
        console.log('atos')
        setBreadCrumbs(prev => {
          const newArray = [...prev];
          newArray.pop();
          return newArray;
        });
      }
    }).catch(err => {
      console.error(err)
    });

  }

  function createNewFolder() {
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

  return (
    <main className="flex min-h-screen flex-col justify-start gap-2 p-24">
      <div className="flex w-full">
        <input type="text" placeholder='New folder name' value={folderName} onChange={e => setFolderName(e.currentTarget.value)}
          className='text-white py-2 px-2 flex-grow bg-transparent border border-gray-200 outline-none text-sm'
        />
        <button className='text-slate-800 py-2 px-2 bg-gray-200 text-sm text-nowrap active:scale-95 hover:bg-white'
          onClick={createNewFolder}>
          Create folder
        </button>
      </div>
      <div className="flex items-center gap-2">
        {
          breadCrumbs.map((bc, index) => <button key={`${bc.id}-${index}`} onClick={() => clickFolder(bc)} className='text-sm breadcrumbs'>{bc.name}</button>)
        }
      </div>
      <div className="flex flex-col justify-start gap-1">
      {
        currentFolder && currentFolder.children.map(folder =>
          <FolderItem key={folder.id} folder={folder}
            onOpenFolder={() => clickFolder(folder)}
            onRenameFolder={renameFolder}
          />
        )
      }
      </div>
      
      {
        (currentFolder && currentFolder.path && !currentFolder.isRoot) &&
        <button className='border p-3' onClick={() => backFolder(currentFolder)}>
          &lt; ----
        </button>
      }
    </main>
  )
}
