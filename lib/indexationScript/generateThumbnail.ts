import ffmpeg from 'fluent-ffmpeg';
import sharp from 'sharp';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { ResourceType } from '@prisma/client';

const extractFrames = (videoPath: string, tempDir: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on('end', () => resolve())
      .on('error', (err) => reject(`Error extracting frames: ${err.message}`))
      .screenshots({
        count: 10,
        folder: tempDir,
        filename: 'frame.png',
        size: '200x?',
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
      .on('end', () => resolve())
      .on('error', (err) => reject(`Error creating GIF: ${err.message}`))
      .save(outputPath);
  });
};

const getVideoDimensions = (
  videoPath: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        return reject(`Error getting video dimensions: ${err.message}`);
      }
      const { width, height } =
        metadata.streams.find((stream) => stream.width && stream.height) || {};
      if (width && height) {
        resolve({ width, height });
      } else {
        reject('Could not retrieve video dimensions');
      }
    });
  });
};

const generateThumbnail = async (
  file: string,
  type: ResourceType
): Promise<{ thumbnailPath: string; width: number; height: number }> => {
  // take everything before the first "/" as a base directory, add a subfolder "gallery_thumbnails" and the rest of the path
  const outputFilePath = file.replace(
    /^(.*?)(\/)(.*)$/,
    '$1/gallery_thumbnails/$3'
  );

  const gifOutputFilePath = path.format({
    ...path.parse(outputFilePath),
    base: undefined,
    ext: '.gif',
  });

  let width = 0;
  let height = 0;

  // Handle image thumbnail and dimensions
  if (type === 'IMAGE') {
    try {
      await fs.access(outputFilePath);
      // delete the thumbnail if it exists
      await fs.rm(outputFilePath);
      throw new Error('Thumbnail already exists');
    } catch {
      // We need to create the folder structure for the thumbnail, in case the image is deep in a folder
      await fs.mkdir(path.dirname(outputFilePath), { recursive: true });

      const image = sharp(file);
      const metadata = await image.metadata();
      width = metadata.width!;
      height = metadata.height!;
      await image.resize(200).toFile(outputFilePath);
    }

    if (width === 0 || height === 0) {
      throw new Error('Could not retrieve image dimensions');
    }

    // if (thumbnailAlreadyExists) throw new Error('Thumbnail already exists');
    return { thumbnailPath: outputFilePath, width, height };
  } else {
    // Handle video thumbnail and dimensions
    try {
      await fs.access(gifOutputFilePath);
      // delete the thumbnail if it exists
      await fs.rm(outputFilePath);
      throw new Error('Thumbnail already exists');
    } catch {
      const { width: videoWidth, height: videoHeight } =
        await getVideoDimensions(file);
      width = videoWidth;
      height = videoHeight;

      const tempDir = outputFilePath + '-temp';
      await fs.mkdir(tempDir, { recursive: true });
      await extractFrames(file, tempDir);
      await createGif(tempDir, gifOutputFilePath);
      console.log('GIF created: ', gifOutputFilePath);
      await fs.rm(tempDir, { recursive: true, force: true });
    }

    if (width === 0 || height === 0) {
      throw new Error('Could not retrieve video dimensions');
    }

    return { thumbnailPath: gifOutputFilePath, width, height };
  }
};

export default generateThumbnail;
