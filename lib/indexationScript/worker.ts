import { Resource, Worker } from '@prisma/client';
import {
  getWorker,
  updateWorker,
} from '@/lib/indexationScript/indexationDbActions';
import { defineIndexables } from '@/lib/indexationScript/defineIndexables';
import { indexationPipeline } from '@/lib/indexationScript/indexationPipeline';

async function indexResources(): Promise<Array<Resource>> {
  const newlyIndexedResources = new Array<Resource>();
  const dbWorker: Worker | null = await getWorker();
  let error: Error | null = null;

  if (!dbWorker) throw new Error('Worker not found');
  if (dbWorker.state === 'BUSY') throw new Error('Worker is busy');

  try {
    // Initiate worker state
    await updateWorker({
      state: 'BUSY',
      progress: 0,
    });
    let lastDBUpdate = new Date();

    const indexables = await defineIndexables();

    let i = 0;
    for (const indexable of indexables) {
      i++;
      newlyIndexedResources.push(await indexationPipeline(indexable));
      const now = new Date();

      if (now.getTime() - lastDBUpdate.getTime() > 1000) {
        await updateWorker({
          state: 'BUSY',
          progress: Math.round((i / indexables.length) * 100),
        });
        lastDBUpdate = now;
      }
    }
  } catch (e: any) {
    error = e;
  } finally {
    await updateWorker({
      state: 'IDLE',
      progress: error ? -1 : 100,
    });
  }

  if (error) throw error;

  return newlyIndexedResources;
}

indexResources().then((newlyIndexedResources: Array<Resource>) => {
  console.log(
    'Successfully indexed resources:',
    newlyIndexedResources.map((r) => r.name)
  );
  console.log('Total resources indexed:', newlyIndexedResources.length);
});
