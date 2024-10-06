import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const sourceDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files_copy');

  try {
    await fs.access(sourceDir);
    try {
      await fs.access(destDir);
      throw new Error('FS operation failed');
    } catch {
      await fs.mkdir(destDir);
      const files = await fs.readdir(sourceDir);
      await Promise.all(
        files.map((file) => fs.copyFile(path.join(sourceDir, file), path.join(destDir, file))),
      );
    }
  } catch {
    throw new Error('FS operation failed');
  }
};

await copy();
