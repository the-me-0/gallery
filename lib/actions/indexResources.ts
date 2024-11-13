'use server';

import {
  imageExtensions,
  videoExtensions,
} from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';
import generateThumbnail from '@/lib/actions/generateThumbnail';
import { db } from '@/lib/db';
import { Resource, ResourceType } from '@prisma/client';

const pushToDB = async (
  filePath: string,
  thumbnailPath: string,
  type: ResourceType,
  width: number,
  height: number
): Promise<Resource> => {
  const thumbnail = await db.resourceThumbnail.create({
    data: {
      location: '/' + thumbnailPath,
      name: filePath.substring(0, filePath.lastIndexOf('.')),
    },
  });

  return await db.resource.create({
    data: {
      location: '/' + filePath,
      height,
      width,
      name: filePath.substring(0, filePath.lastIndexOf('.')),
      type: type,
      thumbnailId: thumbnail.id,
      // no profileId here, as it is not known at this point. Images newly indexed will have to be manually attributed by admins.
    },
  });
};

const getResourceType = (extension: string): ResourceType | null => {
  if (imageExtensions.includes(extension)) {
    return 'IMAGE';
  }
  if (videoExtensions.includes(extension)) {
    return 'VIDEO';
  }
  return null;
};

const indexDirectory = async (
  dirPath: string,
  isPrivate: boolean,
  alreadyIndexed: Array<string> = []
): Promise<Array<Resource>> => {
  let resources: Array<Resource> = [];

  const files: Array<string> = await fs.readdir(dirPath);

  for (const file of files) {
    if (file.startsWith('.')) continue;

    // If the file is already indexed, skip it
    const filePath = path.join(dirPath, file);
    if (alreadyIndexed.includes('/' + filePath)) continue;

    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      resources = resources.concat(await indexDirectory(filePath, isPrivate));
    } else {
      const extension = path.extname(file).toLowerCase();
      const type = getResourceType(extension);

      if (type) {
        const { thumbnailPath, width, height } = await generateThumbnail(
          filePath,
          type,
          isPrivate
        );

        const resource = await pushToDB(filePath, thumbnailPath, type, width, height);

        resources.push(resource);
      }
    }
  }

  return resources;
};

// TODO: files that are added using indexation script can have unauthorized text elements.
// example : "(". FIX : files that are considered to have an unsafe name can be renamed with admin panel ?

const indexResources = async (): Promise<Array<Resource>> => {
  const alreadyIndexed: Array<string> = (
    await db.resource.findMany({
      select: {
        location: true,
      },
    })
  ).map((resource: { location: string }) => resource.location);

  const publicResources = await indexDirectory(
    'resources/',
    false,
    alreadyIndexed
  );
  // const privateResources = await indexDirectory(
  //   'resources-private/',
  //   true,
  //   alreadyIndexed
  // );
  return [...publicResources]; // ...privateResources
};

export default indexResources;
