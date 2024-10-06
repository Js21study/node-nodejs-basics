import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const inputFilePath = path.join(__dirname, 'files', 'archive.gz');
  const outputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const gunzip = createGunzip();
  const inputStream = createReadStream(inputFilePath);
  const outputStream = createWriteStream(outputFilePath);

  inputStream
    .pipe(gunzip)
    .pipe(outputStream)
    .on('finish', () => {
      console.log('File decompressed successfully to fileToCompress.txt');
    })
    .on('error', (err) => {
      console.error(`Error decompressing file: ${err.message}`);
    });
};

await decompress();
