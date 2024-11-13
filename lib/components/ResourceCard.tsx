'use client';

import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { Resource, ResourceThumbnail, ResourceType } from '@prisma/client';
import { GImage } from '@/lib/components/media-contents/GImage';
import { useModal } from '@/hooks/use-modal-store';

interface Props {
  resource: Resource & { thumbnail: ResourceThumbnail };
  columnWidth: number;
  forcedAspectRatio?: number;
}

const ResourceCard = ({
  resource,
  columnWidth,
  forcedAspectRatio,
}: Props): JSX.Element | null => {
  const { onOpen } = useModal();
  const img = useRef<HTMLImageElement | null>(null);
  const [isGifRunning, setIsGifRunning] = useState<boolean | null>(null);

  const playPauseGif = useCallback(() => {
    if (resource.type !== ResourceType.VIDEO) return;
    if (!img.current) return;

    if (isGifRunning || isGifRunning === null) {
      let canvasElement = document.createElement('canvas');

      canvasElement.width = img.current.width;
      canvasElement.height = img.current.height;

      canvasElement.getContext('2d')?.drawImage(img.current, 0, 0);
      img.current.src = canvasElement.toDataURL('image/gif');

      setIsGifRunning(false);
    } else {
      img.current.src = resource.thumbnail.location;

      setIsGifRunning(true);
    }
  }, [resource, isGifRunning]);

  useEffect(() => {
    playPauseGif();
  }, []);

  return (
    <div
      className='group card box-border h-fit cursor-pointer bg-base-100'
      style={{ width: columnWidth, aspectRatio: forcedAspectRatio }}
      onClick={() => onOpen(resource.type, { resource })}
      onPointerEnter={() => playPauseGif()}
      onPointerLeave={() => playPauseGif()}
      // onTouchStart={() => playPauseGif()}
    >
      <figure
        className='relative rounded-b-2xl'
        style={{ aspectRatio: forcedAspectRatio }}
      >
        <GImage
          src={resource.thumbnail.location}
          alt={resource.thumbnail.name}
          ref={img}
        />
      </figure>
      <div className='card-body absolute bottom-0 w-full rounded-b-2xl bg-base-100 bg-opacity-65 p-0 px-2 opacity-0 group-hover:opacity-100'>
        <p className='mx-auto w-fit max-w-full overflow-hidden text-ellipsis text-nowrap text-primary text-opacity-85'>
          {resource.thumbnail.name}
        </p>
      </div>
    </div>
  );
};

export { ResourceCard };
