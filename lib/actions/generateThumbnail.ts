'use server';

import ffmpeg from 'fluent-ffmpeg';
import sharp from 'sharp';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { ResourceType } from '@/lib/types';

const extractFrames = (videoPath: string, tempDir: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error extracting frames: ${err.message}`);
        reject(err);
      })
      .screenshots({
        count: 10,
        folder: tempDir,
        filename: 'frame.png',
        size: '200x?'
      });
  });
};

const createGif = (tempDir: string, outputPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(path.join(tempDir, 'frame_%d.png'))
      .inputOptions('-framerate 2')
      .outputOptions('-vf', 'scale=320:-1:flags=lanczos')
      .outputOptions('-loop', '0')
      .on('end', () => {
        console.log(`GIF created at ${outputPath}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error creating GIF: ${err.message}`);
        reject(err);
      })
      .save(outputPath);
  });
};

const generateThumbnail = async (file: string, type: ResourceType, isPrivate: boolean): Promise<string> => {
  const relativePath = path.relative(isPrivate ? 'resources-private/' : 'resources/', file);
  const outputFilePath = path.join('resources-thumbnails/', relativePath);

  const gifOutputFilePath = path.format({
    ...path.parse(outputFilePath),
    base: undefined, // Remove the base to avoid doubling the filename.
    ext: '.gif' // Set the new extension.
  });

  if (type === 'image') {
    // Check if thumbnail does not already exist
    try {
      await fs.access(outputFilePath);
      return outputFilePath;
    } catch {
      // file does not exist: continue !
    }
  } else {
    // Check if thumbnail does not already exist
    try {
      await fs.access(gifOutputFilePath);
      return gifOutputFilePath;
    } catch {
      // file does not exist: continue !
    }
  }

  // Create lacking directories (if there is)
  const outputDir = path.dirname(outputFilePath);
  await fs.mkdir(outputDir, { recursive: true });

  // Creating a thumbnail for a video or an image is different
  if (type === 'image') {
    sharp(file)
      .resize(200)
      .toFile(outputFilePath, (err, info) => {
        if (err) {
          console.error(`Error creating thumbnail for file ${file}`);
          throw err;
        }
        console.log(`Thumbnail created for ${file}`);
      });
  } else {
    // Create a temporary directory for frames
    const tempDir = path.join(outputDir, 'temp');
    await fs.mkdir(tempDir, { recursive: true });

    // Extract frames for the gif
    await extractFrames(file, tempDir);

    // Create gif from extracted frames
    await createGif(tempDir, gifOutputFilePath);

    // Delete temporary dir
    await fs.rm(tempDir, { recursive: true, force: true });

    console.log(`GIF thumbnail created for video ${file}`);
  }

  return outputFilePath;
};

export default generateThumbnail;
