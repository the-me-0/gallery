'use client';

import { useModal } from '@/hooks/use-modal-store';
import { GImage } from '@/lib/components/GImage';
import { useEffect, useState } from 'react';

const ImageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [titleDisplay, setTitleDisplay] = useState<{
    active: boolean;
    forced: boolean;
  }>({ active: true, forced: false });

  const isModalOpen = isOpen && type === 'image';

  useEffect(() => {
    if (!data.content) {
      setImg(null);
      return;
    }

    // Set img
    const img = new window.Image();
    img.src = data.content.src;
    img.onload = () => {
      setImg(img);
    };

    return () => setTitleDisplay({ active: true, forced: false });
  }, [data.content]);

  useEffect(() => {
    if (!img) return;

    // set the good display size (maximize while keeping ratio)
    const imageWidth = img.width;
    const imageHeight = img.height;
    const imageRatio = imageWidth / imageHeight;

    const windowWidth = window.innerWidth * 0.9; // keep a margin
    const windowHeight = window.innerHeight * 0.9; // keep a margin

    if (windowWidth / windowHeight > imageRatio) {
      // La fenêtre est plus large par rapport à sa hauteur
      setDisplaySize({
        width: windowHeight * imageRatio,
        height: windowHeight,
      });
    } else {
      setDisplaySize({ width: windowWidth, height: windowWidth / imageRatio });
    }
  }, [img]);

  if (!data.content) return null;

  return (
    <dialog className={`modal ${isModalOpen && 'modal-open'}`}>
      <div
        className={`group modal-box max-h-full max-w-full p-0`}
        style={{ height: displaySize.height, width: displaySize.width }}
        onTouchStart={() =>
          setTitleDisplay({ active: !titleDisplay.active, forced: true })
        }
        onPointerLeave={() =>
          !titleDisplay.forced &&
          setTitleDisplay({ active: false, forced: false })
        }
      >
        <h3
          className={`absolute bottom-0 z-20 w-full bg-base-100 bg-opacity-70 text-center text-lg font-bold text-primary opacity-0 transition duration-200 group-hover:opacity-100 ${titleDisplay.active && 'opacity-100'} `}
        >
          {data.content.title}
        </h3>

        {!img ? (
          <div className='skeleton h-full w-full'></div>
        ) : (
          <GImage src={img} alt={data.content.title} />
        )}

        <div className='modal-action'>
          {/* close the modal with button top right */}
          <form method='dialog'>
            <button
              onClick={onClose}
              className={`btn btn-circle btn-sm absolute right-2 top-2 border-opacity-70 bg-opacity-20 text-base-100 text-opacity-70 opacity-0 group-hover:opacity-100 ${titleDisplay.active && 'opacity-100'} `}
            >
              ✕
            </button>
          </form>
        </div>
      </div>

      {/* close the modal if click outside */}
      <form method='dialog' className='modal-backdrop'>
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export { ImageModal };
