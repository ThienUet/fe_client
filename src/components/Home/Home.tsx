import React, { useEffect } from 'react';
import Header from '../Header/Header';
import { Divider } from 'antd';
import Search from '../Search/Search';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import SocialBarRelative from '../SocialBarRelative/SocialBarRelative';
import HeadTitle from '../Head/head';
import IntroComponent from './_components/IntroComponent';
import FireBaseMessagingLayout from 'components/fcm';
import { User } from 'type/user';
interface Props {
  user: User;
}

export default function Home({ user }: Props) {
  return (
    <div>
      <HeadTitle title='ZeeHome' />
      <FireBaseMessagingLayout user={user}>
        <div className='home-main'>
          <Search />
          <Divider />
          <Banner />
          <Divider />
          <IntroComponent
            img1='/static/banner/wall1.jpg'
            img2='/static/banner/wall2.jpg'
            img3='/static/banner/wall3.jpg'
            title='Chúng tôi sẵn sàng tìm kiếm'
            description='Tìm và lưu một vài căn nhà bạn thích, chúng tôi sẽ tìm kiếm giúp bạn'
            style='left'
          />
          <Divider />
          <IntroComponent
            img1='/static/banner/wall4.jpg'
            img2='/static/banner/wall5.jpg'
            img3='/static/banner/wall6.jpg'
            title='Với đội ngũ chuyên nghiệp'
            description='Chúng tôi cam kết sẽ có những gợi ý phù hợp dành cho bạn'
          />
          <Divider />
          <Footer />
          <SocialBarRelative />
        </div>
      </FireBaseMessagingLayout>
    </div>
  );
}
