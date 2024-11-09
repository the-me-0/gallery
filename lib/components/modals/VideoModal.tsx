'use client';

import { useModal } from '@/hooks/use-modal-store';
import { useEffect, useState } from 'react';

const VideoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [titleDisplay, setTitleDisplay] = useState<{
    active: boolean;
    forced: boolean;
  }>({ active: true, forced: false });

  const isModalOpen = isOpen && type === 'video';

  useEffect(() => {
    if (!data.resource) {
      setVideoSrc(null);
      return;
    }

    // Set video source
    setVideoSrc(data.resource.location);

    return () => setTitleDisplay({ active: true, forced: false });
  }, [data.resource]);

  useEffect(() => {
    if (!videoSrc) return;

    // Create a video element to get dimensions
    const video = document.createElement('video');
    video.src = videoSrc;

    video.onloadedmetadata = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const videoRatio = videoWidth / videoHeight;

      const windowWidth = window.innerWidth * 0.9; // keep a margin
      const windowHeight = window.innerHeight * 0.9; // keep a margin

      if (windowWidth / windowHeight > videoRatio) {
        // The window is wider compared to its height
        setDisplaySize({
          width: windowHeight * videoRatio,
          height: windowHeight,
        });
      } else {
        setDisplaySize({
          width: windowWidth,
          height: windowWidth / videoRatio,
        });
      }
    };
  }, [videoSrc]);

  if (!data.resource) return null;

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
        {!videoSrc ? (
          <div className='skeleton h-full w-full'></div>
        ) : (
          <video
            src={videoSrc}
            controls
            autoPlay
            style={{ width: '100%', height: '100%' }}
          />
        )}

        <div className='modal-action m-0'>
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

export { VideoModal };
