'use client';

import Image from 'next/image';
import React, { forwardRef, ReactElement } from 'react';

interface GImageProps {
  src: string | HTMLImageElement;
  alt: string;
}

const GImage = forwardRef((props: GImageProps, ref): ReactElement => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      className='object-cover'
      unoptimized
      fill
      ref={ref as any}
    />
  );
});

GImage.displayName = 'GImage';

export { GImage };
