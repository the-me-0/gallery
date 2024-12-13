'use server';

import { Worker } from 'node:worker_threads';

export async function startIndexationWorker(): Promise<void> {
  // Start a worker sharing the Next.js server environment (needs some webpack config)
  // https://github.com/vercel/next.js/discussions/56635#discussioncomment-10410809
  const worker = new Worker(
    new URL('../indexationScript/worker.ts', import.meta.url)
  );

  worker.on('error', (error: Error): void => {
    console.error('=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=');
    console.error('CRITICAL ERROR in startIndexationWorker');
    console.error('=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=');
    console.error('Error details:', error);
    console.error('=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=');
  });
}
