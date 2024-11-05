'use client';

interface Props {
  src: string;
}

const GVideo = ({ src }: Props): JSX.Element => {
  return (
    <video controls preload='none'>
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
};

export { GVideo };
