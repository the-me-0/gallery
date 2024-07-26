"use client";

import { useModal } from '@/hooks/use-modal-store';
import { GImage } from '@/lib/components/GImage';
import { useEffect, useState } from 'react';

// TODO: make the text absolute and show at the bottom on semi-transparent black bg

const ImageModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [ displaySize, setDisplaySize ] = useState({ width: 0, height: 0 });

  const isModalOpen = isOpen && type === 'image';

  useEffect(() => {
    if (!data.image) return;

    const imageWidth = data.image!.src.width;
    const imageHeight = data.image!.src.height;
    const imageRatio = imageWidth / imageHeight;

    const windowWidth = window.innerWidth * 0.9; // keep a margin
    const windowHeight = window.innerHeight * 0.9; // keep a margin

    if (windowWidth / windowHeight > imageRatio) {
      // La fenêtre est plus large par rapport à sa hauteur
      setDisplaySize({ width: windowHeight * imageRatio, height: windowHeight });
    } else {
      setDisplaySize({ width: windowWidth, height: windowWidth / imageRatio });
    }
  }, [data.image]);

  if (!data.image) return null;

  return (
    <dialog className={`modal ${isModalOpen && 'modal-open'}`}>
      <div
        className={`modal-box p-0 max-w-full max-h-full`}
        style={{ height: displaySize.height, width: displaySize.width }}
      >
        <h3 className="font-bold text-lg">{data.image.title}</h3>
        <p className="py-4">Appuie sur echap ou sur le bouton pour quitter</p>
        <GImage src={data.image.src} alt={data.image.title} />

        <div className="modal-action">
          {/* close the modal with button top right */}
          <form method="dialog">
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
