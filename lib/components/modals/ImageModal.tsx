"use client";

import { useModal } from '@/hooks/use-modal-store';
import { GImage } from '@/lib/components/GImage';
import { useEffect, useState } from 'react';

const ImageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [titleDisplay, setTitleDisplay] = useState<boolean>(true);

  const isModalOpen = isOpen && type === 'image';

  useEffect(() => {
    if (!data.image) {
      setImg(null);
      return;
    }

    // Set img
    const img = new window.Image();
    img.src = data.image.fullImage;
    img.onload = () => {
      setImg(img);
    };

    return () => setTitleDisplay(true);
  }, [data.image]);

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
      setDisplaySize({ width: windowHeight * imageRatio, height: windowHeight });
    } else {
      setDisplaySize({ width: windowWidth, height: windowWidth / imageRatio });
    }
  }, [img]);

  if (!data.image) return null;

  return (
    <dialog className={`modal ${isModalOpen && 'modal-open'}`}>
      <div
        className={`modal-box p-0 max-w-full max-h-full group`}
        style={{ height: displaySize.height, width: displaySize.width }}
        onTouchStart={() => setTitleDisplay(!titleDisplay)}
      >
        <h3
          className={`
          font-bold text-lg text-primary transition
          duration-200 absolute bottom-0 w-full z-20
          bg-base-100 bg-opacity-70 text-center opacity-0
          group-hover:opacity-100 ${titleDisplay && 'opacity-100'}
          `}
        >
          {data.image.title}
        </h3>

        {!img ? (
          <div className="skeleton h-full w-full"></div>
        ) : (
          <>
            <GImage src={img} alt={data.image.title} />
          </>
        )}

        <div className="modal-action">
          {/* close the modal with button top right */}
          <form method="dialog">
            <button
              onClick={onClose}
              className={`
                btn btn-sm btn-circle text-opacity-70
                border-opacity-70 bg-opacity-20 text-base-100
                absolute right-2 top-2 opacity-0 group-hover:opacity-100
                ${titleDisplay && 'opacity-100'}
              `}
            >
              ✕
            </button>
          </form>
        </div>
      </div>

      {/* close the modal if click outside */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}

export { ImageModal };
