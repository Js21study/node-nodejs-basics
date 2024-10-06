import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const inputFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const outputFilePath = path.join(__dirname, 'files', 'archive.gz');

  const gzip = createGzip();
  const inputStream = createReadStream(inputFilePath);
  const outputStream = createWriteStream(outputFilePath);

  inputStream
    .pipe(gzip)
    .pipe(outputStream)
    .on('finish', () => {
      console.log('File compressed successfully to archive.gz');
    })
    .on('error', (err) => {
      console.error(`Error compressing file: ${err.message}`);
    });
};

await compress();
