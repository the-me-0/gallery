'use client';

import { JSX, useEffect, useState } from 'react';
import { ResourceType } from '@/lib/types';
import { GImage } from '@/lib/components/GImage';
import { useModal } from '@/hooks/use-modal-store';
import { twMerge } from 'tailwind-merge';

interface Props {
  fullImage: string;
  thumbnailImage: string;
  type: ResourceType;
  title: string;
  className?: string;
}

const ResourceCard = ({fullImage, thumbnailImage, type, title, className}: Props): JSX.Element | null => {
  const { onOpen } = useModal();
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = thumbnailImage;
    img.onload = () => {
      setImg(img);
    };
  }, [thumbnailImage]);

  if (!img) return null;

  // TODO: when adding video support, the onClick that sends to the IMAGE modal will be wrong. or at least send type too

  // TODO: make imgs vertically centered on grid layout but big imgs not touch themselves

  return (
    <div
      className={twMerge('card bg-base-100 box-border h-fit max-h-64 my-auto group cursor-pointer', className)}
      onClick={() => onOpen('image', { image: { fullImage, title } })}
    >
      <figure className='relative rounded-b-2xl' style={ img.width/img.height > 4/3 ? { aspectRatio: '4/3' } : { aspectRatio: `${img.width}/${img.height}` } }>
        {type === 'image' && <GImage src={img} alt={title} />}
        {/*type === 'video' && <Image src={src} alt={title} />*/}
      </figure>
      <div className="card-body rounded-b-2xl p-0 absolute bottom-0 bg-opacity-65 w-full opacity-0 bg-base-100 group-hover:opacity-100 px-2">
        <p
          className='mx-auto w-fit max-w-full text-nowrap text-primary text-opacity-85 text-ellipsis overflow-hidden'>
          {title}
        </p>
      </div>
    </div>
  );
}

export { ResourceCard };