import { NextRequest, NextResponse } from 'next/server';
import streamFile from '@/lib/stream-file';
import { sanitizeMultipleStrings } from '@/lib/sanitize-string';
import mime from 'mime';
import path from 'node:path';
import { videoExtensions } from '@/lib/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { fileRoute: Array<string> } }
) {
  try {
    // const profile = await currentProfile();
    // if (!profile) {
    //   return new NextResponse('Unauthorized', {status: 401});
    // }

    const { fileRoute } = await params;
    // remove any non-alphanumeric characters from the imageName, while keeping the dots, dashes, and underscores
    params.fileRoute = sanitizeMultipleStrings(fileRoute);

    const file = `resources-thumbnails/${params.fileRoute.join('/')}`;

    // gzip is false on default as compressing images offers next to no gain,
    // and increases processing time (both on server and client)
    const data: ReadableStream<Uint8Array> = streamFile(file, false);

    // define mime type
    let mimeType = mime.getType(file);
    if (!mimeType) {
      mimeType = 'application/octet-stream';
    }

    return new NextResponse(data, {
      status: 200,
      headers: new Headers({
        'Content-Encoding': '', // if gzip was used, set to 'gzip'
        'content-type': mimeType,
        'cache-control': 'public, max-age=604800, immutable',
      }),
    });
  } catch (error) {
    console.log('[ASSETS_SONG]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
