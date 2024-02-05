import { getMimeType, getParentPath } from '@/app/utils/utils';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const data = await req.formData();
    const files = data.getAll('files[]');
    const paths = data.getAll('relativePaths[]');
    const destination = data.get('destination') as string;
    let firstDirectory = '';

    try {

        // if there are files
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i] as File;
                const webkitRelativePath = paths[i] as string;
                
                // get relative path
                const relativePath = webkitRelativePath;
                console.log(relativePath)
                let splitedRelativePath = relativePath.split('/');
                splitedRelativePath.pop(); // remove the name of the file
    
                firstDirectory = splitedRelativePath[0];
                
                // create folders based on the relative path
                let rightPath = `${destination}`
                splitedRelativePath.map(async rPath => {
                    rightPath += `\\${rPath}`;
                    // create the folder if it doesn't exist
                    if (!fs.existsSync(rightPath)) {
                        await fs.mkdirSync(rightPath);
                    }
                });
    
        
                const arrayBufferView = new Uint8Array(await file.arrayBuffer());
            
                let filePath = `${destination}\\${webkitRelativePath}`;
            
                // check if file exist
                if (fs.existsSync(filePath)) {
                    // delete it to override after
                    await fs.unlinkSync(filePath);
                }
                
                await fs.writeFileSync(filePath, arrayBufferView);
            
            }
    
            const folderInfo: Folder = {
                name: firstDirectory,
                isDirectory: true,
                children: [],
                id: randomUUID(),
                isRoot: false,
                path: `${destination}\\${firstDirectory}`,
                parent: destination,
            }
    
            return new Response(JSON.stringify({
                ok: true,
                message: "Success",
                folderInfo: folderInfo
            }));
        } else {
            return new Response(JSON.stringify({
                ok: false,
                message: "Error",
                folderInfos: "Il n'y avait pas de fichiers dans le dossier."
            }));
        }
        
    } catch (error) {
        console.error(error);
        // folder exists
        return new Response(JSON.stringify({
            ok: false,
            message: "Folder exists!"
        }));
    }

}