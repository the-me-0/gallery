'use client';

import { JSX, useEffect, useState } from 'react';
import { ResourceType } from '@/lib/types';
import { GImage } from '@/lib/components/GImage';
import { useModal } from '@/hooks/use-modal-store';

interface Props {
  src: string;
  type: ResourceType;
  title: string;
}

const ResourceCard = ({src, type, title}: Props): JSX.Element | null => {
  const { onOpen } = useModal();
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImg(img);
    };
  }, [src]);

  if (!img) return null;

  // TODO: when adding video support, the onClick that sends to the IMAGE modal will be wrong. or at least send type too

  return (
    <div
      className="card bg-base-100 box-border h-fit max-h-64 my-auto"
      onClick={() => onOpen('image', { image: { src: img, title } })}
    >
      <figure className='relative' style={ img.width/img.height > 4/3 ? { aspectRatio: '4/3' } : { aspectRatio: `${img.width}/${img.height}` } }>
        {type === 'image' && <GImage src={img} alt={title} />}
        {/*type === 'video' && <Image src={src} alt={title} />*/}
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