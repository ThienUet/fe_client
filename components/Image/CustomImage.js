import React from 'react'
import Image from 'next/image'

export default function CustomImage({src, type, alt, width, ...rest}) {
  let _img = '/static/err_icon/err_load_image.png';
    return (
    <Image layout='fill' objectFit='contain' {...rest} src={src || _img} alt={alt || 'NhaTot.com'} loading='lazy' />
  )
}
