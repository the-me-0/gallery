'use client';

import { JSX, useEffect, useRef, useState } from 'react';
import { ResourceType } from '@/lib/types';
import { GImage } from '@/lib/components/GImage';
import { useModal } from '@/hooks/use-modal-store';
import { twMerge } from 'tailwind-merge';

interface Props {
  src: string;
  thumbnailSrc: string;
  type: ResourceType;
  title: string;
  className?: string;
}

const ResourceCard = ({src, thumbnailSrc, type, title, className}: Props): JSX.Element | null => {
  const { onOpen } = useModal();
  const img = useRef<HTMLImageElement | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('4/3');
  const [isGifRunning, setIsGifRunning] = useState<boolean>(false);

  const playPauseGif = (play: boolean) => {
    if (img.current === null || !(/^(?!data:).*\.gif/i.test(thumbnailSrc))) {
      // If image is not a gif
      return;
    }

    if (!play) {
      // Then we pause the gif
      let canvasElement = document.createElement('canvas');
      let w = canvasElement.width = img.current.naturalWidth;
      let h = canvasElement.height = img.current.naturalHeight;
      canvasElement.getContext('2d')?.drawImage(img.current, 0, 0, w, h);
      try {
        img.current.src = canvasElement.toDataURL("image/gif"); // if possible, retain all css aspects
      } catch(e) { // cross-domain -- mimic original with all its tag attributes
        for (let j = 0, a; a = img.current.attributes[j]; j++)
          canvasElement.setAttribute(a.name, a.value);
        img.current.parentNode?.replaceChild(canvasElement, img.current);
      }
      setIsGifRunning(false);
    } else {
      img.current.src = thumbnailSrc;

      setIsGifRunning(true);
    }
  }

  useEffect(() => {
    if (!img.current) return;

    setAspectRatio(`${img.current.naturalWidth}/${img.current.naturalHeight}`);

    playPauseGif(false);
  }, [img.current]);

  return (
    <div
      className={twMerge('card bg-base-100 box-border h-fit max-h-64 my-auto group cursor-pointer', className)}
      onClick={() => type === 'image' ?
        onOpen('image', { content: { src, title } }) :
        onOpen('video', { content: { src, title } })
      }
      // onPointerEnter={() => playPauseGif(true)}
      // onPointerLeave={() => playPauseGif(false)}
      onTouchStart={() => playPauseGif(!isGifRunning)}
    >
      <figure className='relative rounded-b-2xl' style={{ aspectRatio }}>
        <GImage src={thumbnailSrc} alt={title} ref={img} />
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