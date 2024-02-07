'use client'
import React, { DragEvent, useState } from 'react'

const BreadCrumb = ({
    children, onClick, folder, onDropFile
} : {
    children: React.ReactNode, onClick: Function, folder: Folder, onDropFile?: Function
}) => {

    const [isDragEnter, setIsDragEnter] = useState(false);

    function handleDragEnter(event: DragEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsDragEnter(true);
    }

    function handleDragLeave(event: DragEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsDragEnter(false);
    }

    function handleDrop(event: DragEvent<HTMLButtonElement>) {
        event.preventDefault();
        let fileToBeTransfered: Folder = JSON.parse(event.dataTransfer.getData('folder'));
        setIsDragEnter(false);
        onDropFile && onDropFile(fileToBeTransfered, folder);
    }

    return (
        <button className={`text-sm breadcrumbs ${isDragEnter ? '!text-sky-500' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => onClick()}
        >
            {children}
        </button>
    )
}

export default BreadCrumb