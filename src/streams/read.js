import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  const stream = createReadStream(filePath, { encoding: 'utf8' });

  stream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  stream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};

await read();
