import path from 'node:path';
import { Resource, ResourceType } from '@prisma/client';
import { imageExtensions, videoExtensions } from '@/lib/types';
import generateThumbnail from '@/lib/indexationScript/generateThumbnail';
import { db } from '@/lib/db';

/**
 * Indexation pipeline is a set of functions that are executed in a sequence to index a resource :
 * 1. Determining the type of the resource (image, video)
 * 2. Creating a thumbnail for the resource
 * 3. Pushing the resource to the database
 * @param filePath - path of the resource to be indexed
 * @return resource - the indexed resource
 */
export async function indexationPipeline(filePath: string): Promise<Resource> {
  const extension = path.extname(filePath).toLowerCase();
  const type = getResourceType(extension);

  if (!type)
    throw new Error(
      `Extension ${extension} is not yet supported. Contact the administrator.`
    );

  const { thumbnailPath, width, height } = await generateThumbnail(
    filePath,
    type
  );

  return await pushToDB(filePath, thumbnailPath, type, width, height);
}

const getResourceType = (extension: string): ResourceType | null => {
  if (imageExtensions.includes(extension)) {
    return 'IMAGE';
  }
  if (videoExtensions.includes(extension)) {
    return 'VIDEO';
  }
  return null;
};

const pushToDB = async (
  filePath: string,
  thumbnailPath: string,
  type: ResourceType,
  width: number,
  height: number
): Promise<Resource> => {
  const name = filePath.substring(
    filePath.lastIndexOf('/') + 1,
    filePath.lastIndexOf('.')
  );

  const thumbnail = await db.resourceThumbnail.create({
    data: {
      location: '/api/' + thumbnailPath,
      name,
    },
  });

  return db.resource.create({
    data: {
      location: '/api/' + filePath,
      height,
      width,
      name,
      type: type,
      thumbnailId: thumbnail.id,
      // no profileId here, as it is not known at this point. Images newly indexed will have to be manually attributed by admins.
    },
  });
};
