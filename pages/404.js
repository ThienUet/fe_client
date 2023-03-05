import React from 'react'
import { useRouter } from 'next/router';
import Image from '@/components/Image/CustomImage';
import { Button } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
export default function Error404() {
  const {route} = useRouter();
  return (
    <>
      <Head>
        <title>Lỗi</title>
      </Head>
      <div className='page-404-main'>
        <div className='page-404'>
          <div className='row'>
            <div className='col-5'>
              <div className=' page-404-logo '>
                <Image src={'/static/logo/404.png'} alt={"logo-404"}/>
              </div>
              <h4 className='page-404-quote'>{`I used to think my life was a tragedy, but now I realize it's a comedy.`}</h4>
              <h4 className='page-404-quote-author'>{`Joker`}</h4>
              </div>
              <div className='col-7 d-flex flex-column justify-content-center'>
              <h1 className='page-404-title'>KHÔNG TÌM THẤY ! LỖI 404 !</h1>
              <h1 className='page-404-content'>Bạn đã truy cập liên kết không tồn tại, vui lòng truy cập lại !</h1>
              <div className='page-404-option'>
                <Link href={'/'}>Về trang chủ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
