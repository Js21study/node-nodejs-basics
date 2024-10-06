import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';

const random = Math.random();

let unknownObject;

const importJson = async (filePath) => {
  return await import(filePath, {
    assert: { type: 'json' },
  });
};

try {
  if (random > 0.5) {
    unknownObject = await importJson(new URL('./files/a.json', import.meta.url));
  } else {
    unknownObject = await importJson(new URL('./files/b.json', import.meta.url));
  }
} catch (error) {
  console.error(`Error importing JSON: ${error.message}`);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(`Path to current directory is ${path.dirname(import.meta.url)}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
