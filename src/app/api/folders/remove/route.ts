import fs from 'fs';
import path from 'path';

export async function DELETE(req: Request) {
    const { selectedFolders } = await req.json();
    
    selectedFolders.map(async (folder: Folder) => {
      // if folder
      if (folder.isDirectory) 
        await removeFolderRecursive(folder.path);
      else
        await fs.unlinkSync(folder.path)
    });
    
    
    return new Response(JSON.stringify({
        ok: true,
        message: "Success",
    }));
}

function removeFolderRecursive(folderPath: string) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file, index) => {
        const currentPath = path.join(folderPath, file);
        if (fs.lstatSync(currentPath).isDirectory()) {
          // Recursively remove subfolders
          removeFolderRecursive(currentPath);
        } else {
          // Remove file
          fs.unlinkSync(currentPath);
        }
      });
      // Remove the empty folder
      fs.rmdirSync(folderPath);
    }
  }