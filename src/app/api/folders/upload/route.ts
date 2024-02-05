import { getMimeType, getParentPath } from '@/app/utils/utils';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const data = await req.formData();
    const files = data.getAll('files[]');
    const destination = data.get('destination') as string;
    const folderInfos: any[] = [];

    try {
        for (let i = 0; i < files.length; i++) {
            const data = files[i];
            
            const file = data as File;
    
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
            
            // check if file is created
            if (fs.existsSync(filePath)) {
                const fileStats = await fs.statSync(filePath);
    
                const folderInfo: Folder = {
                    id: randomUUID(),
                    name: file.name,
                    isDirectory: fileStats.isDirectory(),
                    children: [],
                    parent: destination,
                    path: filePath,
                    isRoot: false,
                    type: getMimeType(path.extname(filePath)),
                    size: fileStats.size || 0
                };
                
                folderInfos.push({    
                    folderInfo,
                    wasExisted: wasExisted
                });
            }
        
        }

        return new Response(JSON.stringify({
            ok: true,
            message: "Success",
            folderInfos: folderInfos
        }));
        
    } catch (error) {
        console.error(error);
        // folder exists
        return new Response(JSON.stringify({
            ok: false,
            message: "Folder exists!"
        }));
    }

}