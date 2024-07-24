'use client';

import { JSX, useEffect, useState } from 'react';
import { ResourceType } from '@/lib/types';
import { GImage } from '@/lib/components/GImage';

interface Props {
  src: string;
  alt: string;
  type: ResourceType;
  title: string;
}

const ResourceCard = ({src, alt, type, title}: Props): JSX.Element | null => {
  const [aspectRatio, setAspectRatio] = useState<string>('1 / 1');
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      if ((img.width/img.height) > 4/3) {
        setAspectRatio('4/3');
      } else {
        setAspectRatio(`${img.width}/${img.height}`);
      }
      setImg(img);
    };
  }, [src]);

  if (!img) return null;

  return (
    <div className="card bg-base-100 box-border h-fit max-h-64 my-auto">
      <figure className='relative' style={{ aspectRatio }}>
        {type === 'image' && <GImage src={img} alt={alt} />}
        {/*type === 'video' && <Image src={src} alt={alt} />*/}
      </figure>
      <div className="card-body p-0 mx-4">
        <p
          className='mx-auto w-fit max-w-full text-nowrap text-primary text-opacity-85 text-ellipsis overflow-hidden'>
          {title}
        </p>
      </div>
    </div>
  );
}

export { ResourceCard };