import { NextRequest, NextResponse } from 'next/server';
import streamFile from '@/lib/stream-file';
import { sanitizeMultipleStrings } from '@/lib/sanitize-string';

export async function GET(
  req: NextRequest,
  { params }: { params: { fileRoute: Array<string> } }
) {
  try {
    // const profile = await currentProfile();
    // if (!profile) {
    //   return new NextResponse('Unauthorized', {status: 401});
    // }

    // additional checks on the private-specific part

    // remove any non-alphanumeric characters from the imageName, while keeping the dots, dashes, and underscores
    params.fileRoute = sanitizeMultipleStrings(params.fileRoute);

    const file = `resources-private/${params.fileRoute.join('/')}`;
    const data: ReadableStream<Uint8Array> = streamFile(file);

    return new NextResponse(data, {
      status: 200,
      headers: new Headers({
        'Content-Encoding': 'gzip',
        'content-type': 'application/octet-stream',
        'cache-control': 'public, max-age=31536000, immutable',
      }),
    });
  } catch (error) {
    console.log('[ASSETS_SONG]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
