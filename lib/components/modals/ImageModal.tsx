'use client';

import { useModal } from '@/hooks/use-modal-store';
import { useState } from 'react';
import GImageWithProgress from '../media-contents/GImageWithProgress';

const ImageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [titleDisplay, setTitleDisplay] = useState<boolean>(false);

  const isModalOpen = isOpen && type === 'image';

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
        <GImageWithProgress src={data.resource.location} alt={data.resource.name} thumbnailSrc={data.resource.thumbnail.location} />

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
