import React from 'react'
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SocialBarRelative from '@/components/SocialBarRelative/SocialBarRelative';
import { Divider } from 'antd';
export default function ContactV() {
  return (
    <div className='contact-page'>
        <Header />
        <Divider/>
        <Divider/>
        <Footer />
        <SocialBarRelative/>
    </div>
  )
}
