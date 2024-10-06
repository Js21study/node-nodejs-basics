import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = createWriteStream(filePath);

  process.stdin.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('Data written to file successfully.');
  });

  writeStream.on('error', (err) => {
    console.error(`Error writing to file: ${err.message}`);
  });
};

await write();
