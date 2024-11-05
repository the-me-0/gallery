'use client';

import { useEffect, useState } from 'react';
import { ImageModal } from '@/lib/components/modals/ImageModal';
import { VideoModal } from '@/lib/components/modals/VideoModal';
// import {UploadModal} from "@/lib/components/modals/upload-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ImageModal />
      <VideoModal />
    </>
  );
};

export default ModalProvider;
