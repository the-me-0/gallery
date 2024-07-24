'use client';

import Image from 'next/image';

interface Props {
  src: string | HTMLImageElement;
  alt: string;
}

const GImage = ({ src, alt }: Props): JSX.Element => {
  return (
    <Image src={src} alt={alt} className='object-cover' fill unoptimized />
  );
}

export { GImage };