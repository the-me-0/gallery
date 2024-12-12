'use client';

import Image from 'next/image';
import React, { forwardRef, ReactElement } from 'react';

interface GImageProps {
  src: string | HTMLImageElement;
  alt: string;
  className?: string;
}

const GImage = forwardRef((props: GImageProps, ref): ReactElement => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      className={props.className} //
      unoptimized
      fill
      ref={ref as any}
    />
  );
});

GImage.displayName = 'GImage';

export { GImage };
