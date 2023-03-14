import React from 'react';
import Image from 'next/image';

interface Props {
  src?: any;
  alt?: any;
  className?: any;
  objectFit?: any;
  fill?: any;
  loading?: any;
}

export default function CustomImage({
  src,
  alt,
  className,
  objectFit,
  fill,
  loading,
  ...rest
}: Props) {
  const _imgDefault = '/static/err_icon/err_load_image.png';
  return (
    <Image
      className={className}
      layout='fill'
      objectFit={objectFit || 'unset'}
      alt={alt || 'ZILLOW.com'}
      src={src || _imgDefault}
      loading={loading ? loading : 'lazy'}
      fill={fill}
    />
  );
}
