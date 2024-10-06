import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  const dirPath = path.join(__dirname, 'files');

  try {
    await fs.access(dirPath);
    const files = await fs.readdir(dirPath);
    console.log(files);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw new Error('FS operation failed');
    }
  }
};

await list();
