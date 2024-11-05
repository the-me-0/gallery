'use client';

import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { ResourceType } from '@prisma/client';
import { GImage } from '@/lib/components/GImage';
import { useModal } from '@/hooks/use-modal-store';
import { twMerge } from 'tailwind-merge';

interface Props {
  src: string;
  thumbnailSrc: string;
  type: ResourceType;
  name: string;
  className?: string;
}

const ResourceCard = ({
  src,
  thumbnailSrc,
  type,
  name,
  className,
}: Props): JSX.Element | null => {
  const { onOpen } = useModal();
  const img = useRef<HTMLImageElement | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('4/3');
  const [isGifRunning, setIsGifRunning] = useState<boolean>(false);

  const playPauseGif = useCallback(
    (play: boolean) => {
      if (img.current === null || !/^(?!data:).*\.gif/i.test(thumbnailSrc)) {
        // If image is not a gif
        return;
      }

      if (!play) {
        // Then we pause the gif
        let canvasElement = document.createElement('canvas');
        let w = (canvasElement.width = img.current.naturalWidth);
        let h = (canvasElement.height = img.current.naturalHeight);
        img.current.onload = () => {
          if (!img.current) return;
          canvasElement.getContext('2d')?.drawImage(img.current, 0, 0, w, h);

          try {
            img.current.src = canvasElement.toDataURL('image/gif'); // if possible, retain all css aspects
          } catch (e) {
            // cross-domain -- mimic original with all its tag attributes
            for (let j = 0, a; (a = img.current.attributes[j]); j++)
              canvasElement.setAttribute(a.name, a.value);
            img.current.parentNode?.replaceChild(canvasElement, img.current);
          }
          setIsGifRunning(false);
        };
      } else {
        img.current.src = thumbnailSrc;

        setIsGifRunning(true);
      }
    },
    [thumbnailSrc]
  );

  useEffect(() => {
    if (!img.current) return;

    setAspectRatio(`${img.current.naturalWidth}/${img.current.naturalHeight}`);

    playPauseGif(false);
  }, [playPauseGif]);

  return (
    <div
      className={twMerge(
        'group card my-auto box-border h-fit max-h-64 cursor-pointer bg-base-100',
        className
      )}
      onClick={() =>
        type === 'IMAGE'
          ? onOpen('image', { content: { src, name } })
          : onOpen('video', { content: { src, name } })
      }
      // onPointerEnter={() => playPauseGif(true)}
      // onPointerLeave={() => playPauseGif(false)}
      onTouchStart={() => playPauseGif(!isGifRunning)}
    >
      <figure className='relative rounded-b-2xl' style={{ aspectRatio }}>
        <GImage src={thumbnailSrc} alt={name} ref={img} />
      </figure>
      <div className='card-body absolute bottom-0 w-full rounded-b-2xl bg-base-100 bg-opacity-65 p-0 px-2 opacity-0 group-hover:opacity-100'>
        <p className='mx-auto w-fit max-w-full overflow-hidden text-ellipsis text-nowrap text-primary text-opacity-85'>
          {name}
        </p>
      </div>
    </div>
  );
};

export { ResourceCard };
