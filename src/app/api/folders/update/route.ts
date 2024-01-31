import { getParentPath } from '@/app/utils/utils';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const { folderPath, oldName, newName } = await req.json();
    let oldFolderPath = path.join(folderPath, oldName);
    let newFolderPath = path.join(folderPath, newName);
    
    if (!fs.existsSync(newFolderPath)) {
        // rename file 
        await fs.renameSync(oldFolderPath, newFolderPath);

        const fileStats = fs.statSync(newFolderPath);

        const folderInfo: Folder = {
            id: randomUUID(),
            name: newName,
            isDirectory: fileStats.isDirectory(),
            children: [],
            parent: getParentPath(newFolderPath),
            path: newFolderPath,
            isRoot: false
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