import Link from 'next/link';
import React from 'react';
import Image from '../Image/CustomImage';
export default function SocialBarRelative() {
  return (
    <div className='social-bar-relative'>
      <ul className='social-bar-relative-list'>
        <li className='social-bar-relative-item'>
          <Link title='Facebook' href='#'>
            <Image src={'/static/icons/facebook.png'} alt={'image'} />
          </Link>
        </li>
        <li className='social-bar-relative-item'>
          <Link title='Zalo' href='#'>
            <Image src={'/static/icons/zalo.png'} alt={'image'} />
          </Link>
        </li>
        <li className='social-bar-relative-item'>
          <Link title='Đăng ký nhận tin' href='#'>
            <Image src={'/static/icons/email.ico'} alt={'image'} />
          </Link>
        </li>
        <li className='social-bar-relative-item'>
          <Link title='Chat với tư vấn viên' href='#'>
            <Image src={'/static/icons/message.ico'} alt={'image'} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
