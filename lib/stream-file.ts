import {ReadableOptions} from 'node:stream';
import fs from 'fs';
import { createGzip } from 'node:zlib';

/**
 * Return a stream from the disk
 * @param {string} path - The location of the file
 * @param {ReadableOptions} options - The streamable options for the stream (ie how big are the chunks, start, end, etc).
 * @returns {ReadableStream} A readable stream of the file
 */
export default function streamFile(path: string, options?: ReadableOptions): ReadableStream<Uint8Array> {
  const downloadStream = fs.createReadStream(path, options);
  const gzipStream = createGzip();

  return new ReadableStream({
    start(controller) {
      downloadStream.pipe(gzipStream);

      gzipStream.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
      gzipStream.on("end", () => controller.close());
      gzipStream.on("error", (error: NodeJS.ErrnoException) => controller.error(error));
    },
    cancel() {
      downloadStream.destroy();
      gzipStream.destroy();
    },
  });
}