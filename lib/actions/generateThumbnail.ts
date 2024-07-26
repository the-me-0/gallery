'use server';

import sharp from 'sharp';
import path from 'node:path';
import { promises as fs } from 'node:fs';

const generateThumbnail = async (file: string): Promise<string> => {
  const relativePath = path.relative('resources/', file);
  const outputFilePath = path.join('resources-thumbnails/', relativePath);

  // Check if thumbnail does not already exist
  try {
    await fs.access(outputFilePath);
    return outputFilePath;
  } catch {
    // file does not exist: continue !
  }

  // Create lacking directories (if there is)
  const outputDir = path.dirname(outputFilePath);
  await fs.mkdir(outputDir, { recursive: true });

  sharp(file)
    .resize(200)
    .toFile(outputFilePath, (err, info) => {
      if (err) {
        console.error(`Error creating thumbnail for file ${file}`);
        throw err;
      }
      console.log(`Thumbnail created for ${file}`);
    });

  return outputFilePath;
};

export default generateThumbnail;
