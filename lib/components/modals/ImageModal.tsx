"use client";

import { useModal } from '@/hooks/use-modal-store';
import { GImage } from '@/lib/components/GImage';

const ImageModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'image';

  if (!data.image) return null;

  return (
    <dialog className={`modal ${isModalOpen && 'modal-open'}`}>
      <div className="modal-box w-auto p-0 h-11/12 aspect" style={{aspectRatio: data.image.ratio}}>

        <h3 className="font-bold text-lg">{data.image?.title}</h3>
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
