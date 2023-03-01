import React from 'react'
import { Carousel, Input } from 'antd';
import Image from '../Image/CustomImage';
const {Search} = Input;
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';

const dataSlidePoster = [
  {url: '#', img_url: '/static/banner/pexels-photo-298723.png', name: 'banner'},
  {url: '#', img_url: '/static/banner/pexels-photo-298723.png', name: 'banner'},
  {url: '#', img_url: '/static/banner/pexels-photo-298723.png', name: 'banner'},
]

const dataBannerSale = {url: '#', img_url: '/static/banner/pexels-photo-298723.png', name: 'abc'}
const dataBannerAdvertise = {url: '#', img_url: '/static/banner/pexels-photo-298723.png', name: 'abc'}
export default function Banner() {

  return (
    <div className="banner-main">
        <div className='row'>
          <div className='col-7 ps-2 pe-1'>
            <Swiper
              slidesPerView={1} spaceBetween={30} 
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true} pagination={{"clickable": true}}
              navigation={true} className="swiper-main"
              modules={[Autoplay, Pagination, Navigation]}
            >
              {(dataSlidePoster && dataSlidePoster.length > 0
                ? dataSlidePoster.map((slide, key) => {
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
          <div className='col-5 ps-1 pe-2'>
              <div className='banner-pic'>
                <div className='banner-sale'>
                <Link href={dataBannerSale.url || '#'} target="_blank" className='link-banner-sale'>
                      <Image src={dataBannerSale.img_url} fill className="responsive"  alt={dataBannerSale.name} loading="lazy" />
                    </Link>
                </div>
                <div className='banner-advertise'>
                <Link href={dataBannerAdvertise.url || '#'} target="_blank" className='link-banner-advertise'>
                      <Image src={dataBannerAdvertise.img_url} fill className="responsive"  alt={dataBannerAdvertise.name} loading="lazy" />
                    </Link>
                </div>
              </div>

          </div>
        </div>
  </div>
        
  )
}   
