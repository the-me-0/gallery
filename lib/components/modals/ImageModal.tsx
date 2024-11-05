'use client';

import { useModal } from '@/hooks/use-modal-store';
import { GImage } from '@/lib/components/GImage';
import { useEffect, useState } from 'react';

const ImageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [titleDisplay, setTitleDisplay] = useState<boolean>(false);

  const isModalOpen = isOpen && type === 'image';

  useEffect(() => {
    if (!data.resource) {
      setImg(null);
      return;
    }

    // Set img
    const img = new window.Image();
    img.src = data.resource.location;
    img.onload = () => {
      setImg(img);
    };
  }, [data.resource]);

  if (!data.resource) return null;

  const style =
    data.resource.height > data.resource.width
      ? {
          height: data.resource.height,
          width: 'fit-content',
        }
      : {
          width: data.resource.width,
          height: 'fit-content',
        };

  return (
    <dialog className={`modal ${isModalOpen && 'modal-open'}`}>
      <div
        className={`group modal-box relative max-h-[90vh] max-w-[90vw] p-0`}
        style={{
          ...style,
          aspectRatio: data.resource.width / data.resource.height,
        }}
        onPointerEnter={() => setTitleDisplay(true)}
        onPointerLeave={() => setTitleDisplay(false)}
      >
        <h3
          className={`absolute bottom-0 z-20 w-full bg-base-100 bg-opacity-70 text-center text-lg font-bold text-primary opacity-0 transition duration-200 group-hover:opacity-100 ${titleDisplay && 'opacity-100'} `}
        >
          {data.resource.name}
        </h3>

        {!img ? (
          <div className='skeleton h-full w-full'></div>
        ) : (
          <GImage src={img} alt={data.resource.name} />
        )}

        <div className='modal-action mt-0'>
          {/* close the modal with button top right */}
          <form method='dialog'>
            <button
              onClick={onClose}
              className={`btn btn-circle btn-sm absolute right-2 top-2 border-opacity-70 bg-opacity-20 text-base-100 text-opacity-70 opacity-0 group-hover:opacity-100 ${titleDisplay && 'opacity-100'} `}
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
