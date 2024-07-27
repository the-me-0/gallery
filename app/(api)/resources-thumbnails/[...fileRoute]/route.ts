import { NextRequest, NextResponse } from 'next/server';
import streamFile from '@/lib/stream-file';
import { sanitizeMultipleStrings } from '@/lib/sanitize-string';
import mime from 'mime';

export async function GET(
  req: NextRequest,
  { params }: { params: { fileRoute: Array<string> } }
) {
  try {
    // const profile = await currentProfile();
    // if (!profile) {
    //   return new NextResponse('Unauthorized', {status: 401});
    // }

    // remove any non-alphanumeric characters from the imageName, while keeping the dots, dashes, and underscores
    params.fileRoute = sanitizeMultipleStrings(params.fileRoute);

    const file = `resources-thumbnails/${params.fileRoute.join('/')}`;
    const data: ReadableStream<Uint8Array> = streamFile(file);

    // define mime type
    let mimeType = mime.getType(file);
    if (!mimeType) {
      mimeType = 'application/octet-stream';
    }

    return new NextResponse(data, {
      status: 200,
      headers: new Headers({
        'Content-Encoding': 'gzip',
        'content-type': mimeType,
        'cache-control': 'public, max-age=604800, immutable',
      }),
    });
  } catch (error) {
    console.log('[ASSETS_SONG]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
