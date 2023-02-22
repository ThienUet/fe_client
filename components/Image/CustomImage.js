import React from 'react'
import Image from 'next/image'
export default function CustomImage({src, alt, ...rest}) {
    const _imgDefault = '/static/err_icon/err_load_image.png';
  return (
    <Image layout='fill' alt={alt || 'Nhatot.com'} src={src || _imgDefault} loading="lazy" />
  )
}
