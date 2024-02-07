"use client"
import React, { DragEvent, useEffect, useRef, useState } from 'react'
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
    // when target is not child of folder or file item and the delete button
    if(!target.closest('.folder-item') && !target.closest('.delete-btn'))
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

  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('folder', JSON.stringify(folder));
    event.stopPropagation();
  }

  return (
    <div ref={divRef} className={`flex flex-1 ${isLargeIcon ? 'flex-col max-w-44' : 'flex-row'}  items-center gap-1 p-1 cursor-default folder-item
      ${!isLargeIcon && index % 2 !== 0 ? 'bg-gray-900/60' : ''}
      ${isSelected ? '!bg-blue-500/40' : ''} 
      ${(!isSelected && isHovered) ? '!bg-gray-900' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable={true}
      onDragStart={handleDragStart}
    >
      {/* folder icon */}
      <div className={`${isLargeIcon ? 'w-16 h-16' : 'w-10 h-10'} relative flex items-center justify-center hover:cursor-pointer flex-shrink-0`}
        onDoubleClick={() => {
          setIsSelected(false);
          if (folder.type === 'video' || folder.type === 'image')
            onRead && onRead(folder);
        }}
        onClick={() => setIsSelected(!isSelected)}
      >
        {
          isSelected &&
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" className="check">
            <linearGradient id="HoiJCu43QtshzIrYCxOfCa_VFaz7MkjAiu0_gr1" x1="21.241" x2="3.541" y1="39.241" y2="21.541" gradientUnits="userSpaceOnUse"><stop offset=".108" stopColor="#0d7044"></stop><stop offset=".433" stopColor="#11945a"></stop></linearGradient>
            <path fill="url(#HoiJCu43QtshzIrYCxOfCa_VFaz7MkjAiu0_gr1)" d="M16.599,41.42L1.58,26.401c-0.774-0.774-0.774-2.028,0-2.802l4.019-4.019	c0.774-0.774,2.028-0.774,2.802,0L23.42,34.599c0.774,0.774,0.774,2.028,0,2.802l-4.019,4.019	C18.627,42.193,17.373,42.193,16.599,41.42z"></path>
            <linearGradient id="HoiJCu43QtshzIrYCxOfCb_VFaz7MkjAiu0_gr2" x1="-15.77" x2="26.403" y1="43.228" y2="43.228" gradientTransform="rotate(134.999 21.287 38.873)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2ac782"></stop>
              <stop offset="1" stopColor="#21b876"></stop>
            </linearGradient>
            <path fill="url(#HoiJCu43QtshzIrYCxOfCb_VFaz7MkjAiu0_gr2)" d="M12.58,34.599L39.599,7.58c0.774-0.774,2.028-0.774,2.802,0l4.019,4.019	c0.774,0.774,0.774,2.028,0,2.802L19.401,41.42c-0.774,0.774-2.028,0.774-2.802,0l-4.019-4.019	C11.807,36.627,11.807,35.373,12.58,34.599z"></path>
          </svg>
        }
        {
          folder.type === 'video' ?
            <video src={getPathFromPublic(folder.path)} ></video>
          : folder.type === 'image' ?
            <Image src={getPathFromPublic(folder.path)} width={240} height={240} alt={'image'} />
          :
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={isLargeIcon ? '64px' : '40px'} height={isLargeIcon ? '64px' : '40px'} viewBox="0 0 48 48">
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                renameFolder();
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