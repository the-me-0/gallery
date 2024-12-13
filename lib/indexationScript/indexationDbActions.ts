'use server';

import { Prisma, Worker } from '@prisma/client';
import { db } from '@/lib/db';
import WorkerUpdateInput = Prisma.WorkerUpdateInput;

const getWorker: () => Promise<Worker> = async () => {
  const dbWorker: Worker | null = await db.worker.findUnique({
    where: {
      name: 'indexation',
    },
  });

  if (!dbWorker) {
    throw new Error('Worker not found. Should have been created at startup.');
  }

  return dbWorker;
};

const updateWorker: (data: WorkerUpdateInput) => Promise<void> = async (
  data
) => {
  await db.worker.update({
    where: {
      name: 'indexation',
    },
    data,
  });
};

export { getWorker, updateWorker };
