type Folder = {
    id: string,
    name: string,
    isDirectory: boolean,
    children: Array<any>
    parent?: string,
    path: string,
    isRoot: boolean
}

type FolderResp = {
    ok: boolean,
    folderInfo: Folder,
    message?: string
}