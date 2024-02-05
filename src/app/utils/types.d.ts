type Folder = {
    id: string,
    name: string,
    isDirectory: boolean,
    children: Array<any>
    parent?: string,
    path: string,
    isRoot: boolean,
    type?: string,
    size?: number
}

type FolderResp = {
    ok: boolean,
    folderInfo: Folder,
    message?: string,
}