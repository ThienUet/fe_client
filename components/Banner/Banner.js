import React from 'react'
import { Carousel, Input } from 'antd';
import Image from '../Image/CustomImage';
const {Search} = Input;
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';

const dataSlidePoster = [
  {url: '#', img_url: '/static/banner/slider1.png', name: 'banner'},
  {url: '#', img_url: '/static/banner/slider2.jpg', name: 'banner'},
  {url: '#', img_url: '/static/banner/slider3.jpg', name: 'banner'},
]

const dataBannerSale = {url: '#', img_url: '/static/banner/phongtro1.jpg', name: 'abc'}
const dataBannerAdvertise = {url: '#', img_url: '/static/banner/phongtro2.png', name: 'abc'}
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
              modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
              effect='coverflow'
            >
              {(dataSlidePoster && dataSlidePoster.length > 0
                ? dataSlidePoster.map((slide, key) => {
                return (
                  <SwiperSlide key={key}>
                      <Image src={slide.img_url} fill className="responsive"  alt={slide.name} loading="lazy" />
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
