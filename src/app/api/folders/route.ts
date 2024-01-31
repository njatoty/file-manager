// pages/api/getDirectoryStructure.js

import { randomUUID } from 'crypto';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const BASE_DIRECTORY = '_sources';

export async function GET(req: NextApiRequest) {
    const { searchParams } = new URL(req.url!);
    const path_params = searchParams.get('path') || path.join(process.cwd(), 'public', BASE_DIRECTORY);
    if (!path_params) {
        return new Response(JSON.stringify({ error: 'The parameter path is not defined' }));
    }

    const directoryPath = path_params;
    const splitedPath = path_params.split('\\');
    
    try {
        var directoryStructure = await getDirectoryStructure(directoryPath);
        let poped = splitedPath.pop();
        return new Response(JSON.stringify({
            id: randomUUID,
            children: directoryStructure,
            isDirectory: true,
            name: poped,
            path: path_params,
            parent: splitedPath.join('\\'),
            isRoot: poped === BASE_DIRECTORY
        }));
    } catch (error) {
        console.error('Error fetching directory structure:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }));
    }
}

async function getDirectoryStructure(directoryPath: string) {
    const stats = fs.statSync(directoryPath);
    if (!stats.isDirectory()) {
        throw new Error('Provided path is not a directory.');
    }
    const files = fs.readdirSync(directoryPath);
    const structure: Array<any> = [];

    // to get parent path
    const splitedPath = directoryPath.split('\\');
    const poped = splitedPath.pop();
    const parentPath = poped === BASE_DIRECTORY ? directoryPath : splitedPath.join('\\');

    await files.forEach(async file => {
        const filePath = path.join(directoryPath, file);
        const fileStats = fs.statSync(filePath);

        const fileInfo: Folder = {
            id: randomUUID(),
            name: file,
            isDirectory: fileStats.isDirectory(),
            children: [],
            parent: parentPath,
            path: filePath,
            isRoot: poped === BASE_DIRECTORY
        };

        if (fileStats.isDirectory()) {
            let children = await getDirectoryStructure(filePath);
            fileInfo.children = children;
        }

        structure.push(fileInfo);
    });

    return structure;
}
