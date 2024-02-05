import { getParentPath } from '@/app/utils/utils';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const { folderPath, folderName } = await req.json();
    let trimedFolderName = folderName.trim();
    let newFolderPath = path.join(folderPath, trimedFolderName);
    
    if (!fs.existsSync(newFolderPath)) {
        await fs.mkdirSync(newFolderPath);
        const fileStats = fs.statSync(newFolderPath);

        const folderInfo: Folder = {
            id: randomUUID(),
            name: trimedFolderName,
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