"use client"
import React, { useEffect, useRef, useState } from 'react'
import { getPathFromPublic, getSize } from '../utils/utils';
import Image from 'next/image';
import { useClickAway } from '@uidotdev/usehooks';

const FileItem = ({ folder, onRenameFolder, index, onSelect, isLargeIcon, onRead } :
  { folder: Folder, onRenameFolder: Function, index: number, onSelect: Function, isLargeIcon: boolean, onRead?: Function
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
    setFolderName(folder.name);
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
    <div ref={divRef} className={`flex flex-1 ${isLargeIcon ? 'flex-col max-w-44' : 'flex-row'}  items-center gap-1 p-1 cursor-default folder-item
      ${!isLargeIcon && index % 2 !== 0 ? 'bg-gray-900/60' : ''}
      ${isSelected ? '!bg-blue-500/40' : ''} 
      ${(!isSelected && isHovered) ? '!bg-gray-900' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* folder icon */}
      <div className={`${isLargeIcon ? 'w-16 h-16' : 'w-10 h-10'} flex items-center justify-center hover:cursor-pointer overflow-hidden flex-shrink-0`}
        onDoubleClick={() => {
          setIsSelected(false);
          if (folder.type === 'video' || folder.type === 'image')
            onRead && onRead(folder);
        }}
        onClick={() => setIsSelected(!isSelected)}
      >
        {
          folder.type === 'video' ?
            <video src={getPathFromPublic(folder.path)} ></video>
          : folder.type === 'image' ?
            <Image src={getPathFromPublic(folder.path)} width={240} height={240} alt={'image'} />
          :
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="240" height="240" viewBox="0 0 48 48">
              <path fill="#50e6ff" d="M39,16v25c0,1.105-0.895,2-2,2H11c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h17l3,8L39,16z"></path>
              <linearGradient id="VWJODR~F49S8JZXNLPMJka_Ygov9LJC2LzE_gr1" x1="28.529" x2="33.6" y1="2761.471" y2="2756.4" gradientTransform="translate(0 -2746)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3079d6"></stop><stop offset="1" stopColor="#297cd2"></stop></linearGradient>
              <path fill="url(#VWJODR~F49S8JZXNLPMJka_Ygov9LJC2LzE_gr1)" d="M28,5v9c0,1.105,0.895,2,2,2h9L28,5z"></path><path fill="#057093" d="M32.5,24h-17c-0.276,0-0.5-0.224-0.5-0.5v-1c0-0.276,0.224-0.5,0.5-0.5h17c0.276,0,0.5,0.224,0.5,0.5	v1C33,23.776,32.776,24,32.5,24z"></path>
              <path fill="#057093" d="M30.5,28h-15c-0.276,0-0.5-0.224-0.5-0.5v-1c0-0.276,0.224-0.5,0.5-0.5h15c0.276,0,0.5,0.224,0.5,0.5	v1C31,27.776,30.776,28,30.5,28z"></path>
              <path fill="#057093" d="M32.5,32h-17c-0.276,0-0.5-0.224-0.5-0.5v-1c0-0.276,0.224-0.5,0.5-0.5h17c0.276,0,0.5,0.224,0.5,0.5	v1C33,31.776,32.776,32,32.5,32z"></path>
              <path fill="#057093" d="M30.5,36h-15c-0.276,0-0.5-0.224-0.5-0.5v-1c0-0.276,0.224-0.5,0.5-0.5h15c0.276,0,0.5,0.224,0.5,0.5	v1C31,35.776,30.776,36,30.5,36z"></path>
          </svg>
        }
      </div>
      {/* folder name */}
      {
        isLargeIcon ? 
          <textarea value={folderName}
            className='text-white border-none p-2 px-4 text-sm bg-transparent outline-none read-only:cursor-default read-only:select-none flex-grow resize-none text-center'
            onBlur={() => renameFolder()}
            onDoubleClick={() => setEnableEdit(true)}
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
          className='text-white border-none p-2 text-sm bg-transparent outline-none read-only:cursor-default flex-grow'
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
          <div className='flex items-center justify-end text-xs text-gray-600 capitalize mr-3'>
            <span>{folder.type}</span>
          </div>
          <div className='flex items-center justify-end text-xs text-gray-500'>
            <span>{getSize(folder.size!)}</span>
          </div>
        </>
      }
    </div>
  )
}

export default FileItem