import { Worker, isMainThread } from 'worker_threads';
import path from 'path';
import os from 'os';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const runService = (num) => {
  return new Promise((resolve) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'));
    worker.postMessage(num);

    worker.on('message', (result) => {
      resolve(result);
    });

    worker.on('error', () => {
      resolve({ status: 'error', data: null });
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        resolve({ status: 'error', data: null });
      }
    });
  });
};

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  const promises = [];

  for (let i = 0; i < numCPUs; i++) {
    promises.push(runService(10 + i));
  }

  const results = await Promise.all(promises);
  console.log(results);
};

if (isMainThread) {
  await performCalculations();
}
