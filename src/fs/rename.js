import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const oldFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
  const newFilePath = path.join(__dirname, 'files', 'properFilename.md');

  try {
    await fs.access(oldFilePath);
    try {
      await fs.access(newFilePath);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }
    await fs.rename(oldFilePath, newFilePath);
    console.log('File renamed successfully.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await rename();
