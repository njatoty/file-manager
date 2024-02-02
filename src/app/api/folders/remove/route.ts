import fs from 'fs';
import path from 'path';

export async function DELETE(req: Request) {
    const { selectedFolders } = await req.json();
    
    // if folder
    if (selectedFolders.isDirectory) {
      selectedFolders.map(async (folder: Folder) => {
        await removeFolderRecursive(folder.path);
      });
    } else {
      selectedFolders.map(async (file: Folder) => await fs.unlinkSync(file.path))
    }

    // folder exists
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