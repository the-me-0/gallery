'use server';

import { Resource, ResourceThumbnail } from '@prisma/client';
import { db } from '@/lib/db';

const getResources = async (): Promise<
  Array<Resource & { thumbnail: ResourceThumbnail }>
> => {
  const resources = await db.resource.findMany({
    include: {
      thumbnail: true,
    },
  });

  return resources;
};

export default getResources;
