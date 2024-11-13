'use client';

import React, { useState, useEffect } from 'react';
import { GImage } from './GImage';

interface GImageWithProgressProps {
  src: string;
  alt: string;
  thumbnailSrc: string;
}

const GImageWithProgress: React.FC<GImageWithProgressProps> = ({
  src,
  alt,
  thumbnailSrc
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', src, true);
    xhr.responseType = 'blob';

    // Mettre à jour la progression du téléchargement
    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete);
        console.log(percentComplete);
      }
    };

    // Gérer la fin du téléchargement
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blobUrl = URL.createObjectURL(xhr.response);
        setImageSrc(blobUrl);
      }
    };

    xhr.onerror = () => {
      console.error('Erreur lors du téléchargement de l\'image');
    };

    xhr.send();

    // Nettoyage de l’URL de l’image quand le composant est démonté
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [src]);

  return (
    <>
      {!imageSrc && (
        <>
          <progress className="absolute bottom-0 w-full progress z-50" value={progress} max="100"></progress>
          {/* We display the thumbnail that has most likely already been cached while the high quality image loads */}
          <GImage src={thumbnailSrc} alt={alt} />
        </>
      )}
      {imageSrc && <GImage src={imageSrc} alt={alt} />}
    </>
  );
};

export default GImageWithProgress;
