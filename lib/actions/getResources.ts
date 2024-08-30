'use server';

import {
  imageExtensions,
  Resource,
  ResourceType,
  videoExtensions,
} from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';
import generateThumbnail from '@/lib/actions/generateThumbnail';

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
    if (file.startsWith('.')) continue;

    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      resources = resources.concat(await indexDirectory(filePath, isPrivate));
    } else {
      const extension = path.extname(file).toLowerCase();
      const type = getResourceType(extension);

      if (type) {
        const thumbnailPath = await generateThumbnail(filePath, type, isPrivate);

        resources.push({
          type,
          src: filePath,
          thumbnailSrc: thumbnailPath,
          private: isPrivate,
          title: file.substring(0, file.lastIndexOf('.')),
        });
      }
    }
  }

  return resources;
};

// TODO: files that are added using indexation script can have unauthorized text elements.
// example : "(". FIX : files that are considered to have an unsafe name can be renamed with admin panel ?

const getResources = async (): Promise<Array<Resource>> => {
  const publicResources = await indexDirectory('resources/', false);
  const privateResources = await indexDirectory('resources-private/', true);
  return [...publicResources, ...privateResources];
};

export default getResources;
