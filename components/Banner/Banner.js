import React from 'react'
import { Carousel, Input } from 'antd';
import Image from '../Image/CustomImage';
const {Search} = Input;
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';

const data = [
  {url: '#', img_url: '/static/banner/pexels-photo-298723.png', name: 'banner'},
  {url: '#', img_url: '/static/banner/pexels-photo-298723.png', name: 'banner'}
]

export default function Banner() {

  return (
    <div className="banner-main">
        <Swiper
          slidesPerView={1} spaceBetween={30} 
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true} pagination={{"clickable": true}}
          navigation={true} className="swiper-main"
          modules={[Autoplay, Pagination, Navigation]}
        >
          {(data && data.length > 0
          ? data.map((slide, key) => {
            return (
              <SwiperSlide key={key}>
                <Link href={slide.url || '#'} target="_blank" className='link-banner'>
                    <Image src={slide.img_url} fill className="responsive"  alt={slide.name} loading="lazy" />
                </Link>
              </SwiperSlide>
            )
          })
          : null)}
        </Swiper>
  </div>
        
  )
}   
