import React from 'react'
import { Carousel } from 'antd';
import Image from '../Image/CustomImage';


export default function Banner() {
  return (
      <div className='container-fluid app-banner mt-2'>
        <Image className='app-banner-image' src="/static/banner/pexels-photo-298723.png" alt='logo' />
      </div>
)
}
