'use server';

import {
  imageExtensions,
  Resource,
  ResourceType,
  videoExtensions,
} from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

const getResourceType = (extension: string): ResourceType | null => {
  if (imageExtensions.includes(extension)) {
    return 'image';
  }
  if (videoExtensions.includes(extension)) {
    return 'video';
  }
  return null;
};

const indexDirectory = async (
  dirPath: string,
  isPrivate: boolean
): Promise<Array<Resource>> => {
  let resources: Resource[] = [];

  const files: Array<string> = await fs.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      resources = resources.concat(await indexDirectory(filePath, isPrivate));
    } else {
      const extension = path.extname(file).toLowerCase();
      const type = getResourceType(extension);

      if (type) {
        resources.push({
          type,
          location: filePath,
          private: isPrivate,
          title: '', // TODO: replace empty title by file name
        });
      }
    }
  }

  return resources;
};

const getResources = async (): Promise<Array<Resource>> => {
  const publicResources = await indexDirectory('resources/', false);
  const privateResources = await indexDirectory('resources-private/', true);
  return [...publicResources, ...privateResources];
};

export default getResources;
