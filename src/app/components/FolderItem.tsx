"use client"
import { useClickAway } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react'

const FolderItem = ({ folder, onOpenFolder, onRenameFolder, index, onSelect, isLargeIcon } :
  { folder: Folder, onOpenFolder: Function, onRenameFolder: Function, index: number, onSelect: Function, isLargeIcon: boolean
}) => {

  const [folderName, setFolderName] = useState(folder.name);
  const [enableEdit, setEnableEdit] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useClickAway<HTMLDivElement>((e) => {
    let target = e.target as HTMLElement;
    if(!target.closest('.folder-item'))
      setIsSelected(false)
  });

  useEffect(() => {
    setFolderName(folder.name)
    // auto grow height of the textarea
    if (textareaRef.current) {
      let target = textareaRef.current;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight + 2}px`;
    }
  }, [folder]);

  useEffect(() => {
    onSelect && onSelect(folder, isSelected);

  }, [isSelected])

  async function renameFolder () {
    onRenameFolder(folder, folderName);
    setEnableEdit(false);
  }

  return (
    <div ref={divRef} className={`flex flex-1 ${isLargeIcon ? 'flex-col max-w-44' : 'flex-row'}  items-center gap-1 p-1 cursor-default folder-item select-none
      ${!isLargeIcon && index % 2 !== 0 ? 'bg-gray-900/60' : ''}
      ${isSelected ? '!bg-blue-500/40' : ''} 
      ${(!isSelected && isHovered) ? '!bg-gray-900' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* folder icon */}
      <div className={`${isLargeIcon ? 'w-16 h-16' : 'w-10 h-10'} flex items-center justify-center hover:cursor-pointer overflow-hidden flex-shrink-0`}
        onDoubleClick={() => {
          onOpenFolder();
          setIsSelected(false);
        }}
        onClick={() => setIsSelected(!isSelected)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="240" height="240" viewBox="0 0 32 32">
          <linearGradient id="KA3iPnJF2lqt7U2-W-Vona_oiCA327R8ADq_gr1" x1="16" x2="16" y1="4.905" y2="27.01" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#00b5f0"></stop><stop offset="1" stopColor="#008cc7"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vona_oiCA327R8ADq_gr1)" d="M26,27H6c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h4.027c0.623,0,1.22,0.247,1.66,0.688	l0.624,0.624C12.753,6.753,13.35,7,13.973,7H26c1.105,0,2,0.895,2,2v16C28,26.105,27.105,27,26,27z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vonb_oiCA327R8ADq_gr2" x1="16" x2="16" y1="5" y2="27" gradientUnits="userSpaceOnUse"><stop offset="0" stopOpacity=".02"></stop><stop offset="1" stopOpacity=".15"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vonb_oiCA327R8ADq_gr2)" d="M26,7H13.973	c-0.623,0-1.22-0.247-1.66-0.688l-0.625-0.625C11.247,5.247,10.65,5,10.027,5H6C4.895,5,4,5.895,4,7v18c0,1.105,0.895,2,2,2h20	c1.105,0,2-0.895,2-2V9C28,7.895,27.105,7,26,7z M27.75,25c0,0.965-0.785,1.75-1.75,1.75H6c-0.965,0-1.75-0.785-1.75-1.75V7	c0-0.965,0.785-1.75,1.75-1.75h4.027c0.56,0,1.087,0.218,1.484,0.615l0.625,0.625c0.491,0.491,1.143,0.761,1.837,0.761H26	c0.965,0,1.75,0.785,1.75,1.75V25z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vonc_oiCA327R8ADq_gr3" x1="16" x2="16" y1="8.922" y2="27.008" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#00dcff"></stop><stop offset=".859" stopColor="#00bfff"></stop><stop offset="1" stopColor="#00a8e0"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vonc_oiCA327R8ADq_gr3)" d="M27,27H5c-1.105,0-2-0.895-2-2V11	c0-1.105,0.895-2,2-2h22c1.105,0,2,0.895,2,2v14C29,26.105,28.105,27,27,27z"></path><linearGradient id="KA3iPnJF2lqt7U2-W-Vond_oiCA327R8ADq_gr4" x1="16" x2="16" y1="9" y2="27" gradientUnits="userSpaceOnUse"><stop offset="0" stopOpacity=".02"></stop><stop offset="1" stopOpacity=".15"></stop></linearGradient><path fill="url(#KA3iPnJF2lqt7U2-W-Vond_oiCA327R8ADq_gr4)" d="M27,9H5c-1.105,0-2,0.895-2,2v14	c0,1.105,0.895,2,2,2h22c1.105,0,2-0.895,2-2V11C29,9.895,28.105,9,27,9z M28.75,25c0,0.965-0.785,1.75-1.75,1.75H5	c-0.965,0-1.75-0.785-1.75-1.75V11c0-0.965,0.785-1.75,1.75-1.75h22c0.965,0,1.75,0.785,1.75,1.75V25z"></path>
        </svg>
      </div>
      {/* folder name */}
      {
        isLargeIcon ? 
          <textarea value={folderName}
            className='text-white border-none p-2 px-4 text-sm bg-transparent outline-none read-only:cursor-default read-only:select-none flex-grow resize-none text-center'
            onBlur={() => renameFolder()}
            onChange={e => setFolderName(e.currentTarget.value)}
            readOnly={!enableEdit}
            ref={textareaRef}
            onClick={() => {
              if (!isSelected) {
                setIsSelected(!isSelected)
              } else {
                setEnableEdit(true);
              }
            }}
            onInput={(e) => {
              let target = e.currentTarget;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight + 2}px`;
            }}
          />
        :
        <input type="text" value={folderName}
          className='text-white border-none p-2 text-sm bg-transparent outline-none read-only:cursor-default read-only:select-none flex-grow'
          onBlur={() => renameFolder()}
          onDoubleClick={() => setEnableEdit(true)}
          onChange={e => setFolderName(e.currentTarget.value)}
          readOnly={!enableEdit}
          onClick={() => setIsSelected(!isSelected)}
        />
      }
      
      {
        !isLargeIcon &&
        <>
          <div className='flex items-center justify-end text-xs text-gray-500 px-3'>
            <span>{folder.children.length}</span>
          </div>
        </>
      }
    </div>
  )
}

export default FolderItem