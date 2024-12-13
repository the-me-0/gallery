import { db } from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'node:path';

/**
 * Define the indexables for the indexation script
 * Compares the DB data to the actual content from the local files. Sends back a list of "indexables"
 * -- an indexable is a resource that is not yet indexed in the DB
 * @returns The resources that are not yet indexed
 */
export async function defineIndexables(): Promise<Array<string>> {
  const resources = await db.resource.findMany();
  const allLocalFiles = await findAllLocalFiles();

  return (
    allLocalFiles
      // replace all '\' with '/' to make the path consistent
      .map((file) => file.replace(/\\/g, '/'))
      .filter((file) => {
        const notInDB = !resources.some(
          (resource) => resource.location === '/api/' + file
        );
        const notAThumbnail = !file.includes('/gallery_thumbnails/');
        const isAppropriate = path.extname(file) !== ''; // eliminates directories & files starting with a dot

        return notInDB && notAThumbnail && isAppropriate;
      })
  );
}

const findAllLocalFiles = async () => {
  const indexDirectory = async (dirPath: string): Promise<Array<string>> => {
    const dirFiles: string[] = await fs.readdir(dirPath, { recursive: true });

    return dirFiles.map((file) => path.join(dirPath, file));
  };

  const files: Array<string> = await indexDirectory('resources/');
  files.push(...(await indexDirectory('resources-private/')));

  return files;
};
