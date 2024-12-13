'use client';

import React, { useEffect } from 'react';
import { getWorker } from '@/lib/indexationScript/indexationDbActions';
import toast from 'react-hot-toast';

const IndexationFollower = () => {
  const [text, setText] = React.useState<string>(
    'Waiting for worker to start...'
  );

  useEffect(() => {
    let workerHasBeenBusy: boolean = false;

    // each 2 seconds, fetch the worker state and update the text
    const interval = setInterval(async () => {
      const worker = await getWorker();
      if (worker.state === 'BUSY') {
        workerHasBeenBusy = true;
        setText('Worker is busy: ' + worker.progress + '%');
      } else if (worker.state === 'IDLE') {
        if (workerHasBeenBusy) {
          setText('Worker has finished indexing');
          clearInterval(interval);
          // close the toast after 5 seconds
          setTimeout(() => {
            toast.success('Successfully indexed resources. 🎉', {
              id: 'indexation',
              duration: 5000,
            });
          }, 5000);
        } else {
          setText('Worker is idle');
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export { IndexationFollower };
