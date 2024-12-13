import crypto from 'crypto';
import { db } from '@/lib/db';
import fs from 'fs';

const register = async () => {
  const profiles = await db.profile.count();
  const sponsorships = await db.sponsorship.count();

  if (!profiles && !sponsorships) {
    // Then we need to create a new sponsorship key
    console.log('No profile in DB. Creating sponsorship key...');

    const generatedKey = crypto.randomBytes(16).toString('hex');

    const sponsorship = await db.sponsorship.create({
      data: {
        key: generatedKey,
      },
    });

    console.log('New sponsorship key generated:', sponsorship.key);
  } else if (!profiles && sponsorships) {
    const sponsorship = await db.sponsorship.findFirst();

    console.log('Old sponsorship found:', sponsorship?.key);
  }

  await initFolders();
  await initDBWorkers();

  console.log('Gallery project initialized. Enjoy !');
  console.log('=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~');
};

const initFolders = async () => {
  const neededFolders = ['resources', 'resources-private'];

  for (const folder of neededFolders) {
    try {
      await fs.promises.mkdir(`./${folder}`);
    } catch (error: any) {
      if (error.code === 'EEXIST') {
        console.log(`Folder ${folder} already exists.`);
      } else {
        console.error(`Error creating folder ${folder}:`, error);
      }
    }
  }

  console.log('Folders initialized.');
};

const initDBWorkers = async () => {
  const indexationWorker = await db.worker.findUnique({
    where: {
      name: 'indexation',
    },
  });

  if (!indexationWorker) {
    console.log('No indexation worker found in DB. Creating a new one...');

    await db.worker.create({
      data: {
        name: 'indexation',
        state: 'IDLE',
        progress: 0,
      },
    });

    console.log('Indexation worker created.');
  } else {
    console.log('Indexation worker already found in DB. Skipping...');
  }
};

export { register };
