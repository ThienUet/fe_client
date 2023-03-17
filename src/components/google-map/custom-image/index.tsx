import React from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  style?: any;
  alt?: string;
}

const CustomImage = ({ src, alt = '/static/images/default-house-image.jpg', style }: Props) => {
  const addDefaultSrc = (ev) => {
    ev.target.src = alt;
  };

  return (
    <img onError={addDefaultSrc} className='img-responsive' src={src} alt={alt} style={style} />
  );
};

export default CustomImage;
