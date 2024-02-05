import { getMimeType, getParentPath } from '@/app/utils/utils';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const { folderPath, oldName, newName } = await req.json();
    let oldFolderPath = path.join(folderPath, oldName);
    let trimedNewName = newName.trim(); // to remove espace at start and end
    let newFolderPath = path.join(folderPath, trimedNewName);
    
    if (!fs.existsSync(newFolderPath)) {
        // rename file 
        await fs.renameSync(oldFolderPath, newFolderPath);

        const fileStats = fs.statSync(newFolderPath);

        const folderInfo: Folder = {
            id: randomUUID(),
            name: trimedNewName,
            isDirectory: fileStats.isDirectory(),
            children: [],
            parent: getParentPath(newFolderPath),
            path: newFolderPath,
            isRoot: false,
            type: getMimeType(path.extname(newFolderPath)),
            size: fileStats.size || 0
        };

        return new Response(JSON.stringify({
            ok: true,
            folderInfo
        }));
    }

    // folder exists
    return new Response(JSON.stringify({
        ok: false,
        message: "Folder exists!"
    }));
}