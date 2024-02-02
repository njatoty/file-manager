import { getParentPath } from '@/app/utils/utils';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const data = await req.formData();
    const file = data.get('file') as File;
    const destination = data.get('destination') as string;
    const arrayBufferView = new Uint8Array(await file.arrayBuffer());

    let filePath = `${destination}\\${file.name}`;
    let wasExisted = false;

    // check if file exist
    if (fs.existsSync(filePath)) {
        // delete it to override after
        await fs.unlinkSync(filePath);
        wasExisted = true;
    }
    
    await fs.writeFileSync(filePath, arrayBufferView);

    if (fs.existsSync(filePath)) {
        const fileStats = await fs.statSync(filePath);

        const folderInfo: Folder = {
            id: randomUUID(),
            name: file.name,
            isDirectory: fileStats.isDirectory(),
            children: [],
            parent: destination,
            path: filePath,
            isRoot: false
        };
        return new Response(JSON.stringify({
            ok: true,
            message: "Success",
            folderInfo: folderInfo,
            wasExisted: wasExisted
        }));
    }

    // folder exists
    return new Response(JSON.stringify({
        ok: false,
        message: "Folder exists!"
    }));
}