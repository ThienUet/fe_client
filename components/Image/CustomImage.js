import React from 'react'
import Image from 'next/image'
export default function CustomImage({src, alt, className, ...rest}) {
    const _imgDefault = '/static/err_icon/err_load_image.png';
  return (
    <Image className={className} layout='fill' alt={alt || 'ZILLOW.com'} src={src || _imgDefault} loading="lazy" />
  )
}
