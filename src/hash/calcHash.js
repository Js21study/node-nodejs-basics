import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');

  const stream = createReadStream(filePath);

  stream.on('data', (chunk) => {
    hash.update(chunk);
  });

  stream.on('end', () => {
    const result = hash.digest('hex');
    console.log(`SHA256 Hash: ${result}`);
  });

  stream.on('error', (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};

await calculateHash();
