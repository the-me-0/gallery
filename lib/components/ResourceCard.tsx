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
  const [isGifRunning, setIsGifRunning] = useState<boolean>(true);

  // ROLE : pause the gif. Removes the event listener to avoid being called once this very job is done.
  const pausegif = useCallback(() => {
    if (!img.current) return;
    img.current.removeEventListener('load', pausegif);
    let canvasElement = document.createElement('canvas');

    canvasElement.width = img.current.width;
    canvasElement.height = img.current.height;

    const context2d = canvasElement.getContext('2d');
    if (!context2d) throw new Error('Canvas not supported');
    context2d.drawImage(
      img.current,
      0,
      0,
      img.current.width,
      img.current.height
    );
    img.current.src = canvasElement.toDataURL();

    setIsGifRunning(false);
  }, []);

  // ROLE : when called by hover hooks, play or pause the gif.
  const playPauseGif = useCallback(() => {
    if (resource.type !== ResourceType.VIDEO) return;
    if (!img.current) return;

    if (isGifRunning) {
      console.log('playPauseGif', 'pausing');
      pausegif();
    } else {
      console.log('playPauseGif', 'playing');
      img.current.src = resource.thumbnail.location;
      setIsGifRunning(true);
    }
  }, [resource, isGifRunning, pausegif]);

  // ROLE : on first load, pause the gif.
  useEffect(() => {
    const currentImg = img.current;
    if (currentImg) {
      currentImg.addEventListener('load', pausegif);
    }

    return () => {
      if (currentImg) {
        currentImg.removeEventListener('load', pausegif);
      }
    };
  }, [pausegif]);

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
