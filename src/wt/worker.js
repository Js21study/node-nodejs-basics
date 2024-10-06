import { parentPort } from 'worker_threads';

if (!parentPort) {
  throw new Error('This module should be run in a worker thread.');
}

const nthFibonacci = (n) => {
  return n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
};

const sendResult = () => {
  parentPort.on('message', (n) => {
    try {
      const result = nthFibonacci(n);

      parentPort.postMessage({ status: 'resolved', data: result });
    } catch (error) {
      parentPort.postMessage({ status: 'error', data: null });
    }
  });
};

sendResult();
