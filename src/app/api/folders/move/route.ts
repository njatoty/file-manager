import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const { folderSource, folderDestination } = await req.json();
    try {
        let splitedPath = folderSource.split('\\');
        let folderName = splitedPath.pop();
        let dest = `${folderDestination}\\${folderName}`;
        
        if (folderSource !== folderDestination && dest !== folderSource) {
            await fs.renameSync(folderSource, dest);
            if (fs.existsSync(dest)) {
    
                // return
                return new Response(JSON.stringify({
                    ok: true,
                    message: "File has been moved!"
                }));
                
            }
        }
        
        return new Response(JSON.stringify({
            ok: false,
            message: "File has not been moved!"
        }));
        
    } catch (error) {   
        // folder exists
        console.log(error)
        return new Response(JSON.stringify({
            ok: false,
            message: "Folder exists!"
        }));
    }
}