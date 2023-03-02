import React from 'react'
import Image from 'next/image'
export default function CustomImage({src, alt, className, objectFit, ...rest}) {
    const _imgDefault = '/static/err_icon/err_load_image.png';
  return (
    <Image className={className} layout='fill' objectFit={objectFit || 'unset'} alt={alt || 'ZILLOW.com'} src={src || _imgDefault} loading="lazy" />
  )
}
