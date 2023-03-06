import React from 'react'
import Header from '../Header/Header';
import { Divider } from 'antd';
import Search from '../Search/Search';
import Banner from '../Banner/Banner';;
import Footer from '../Footer/Footer';
import SocialBarRelative from '../SocialBarRelative/SocialBarRelative';
import HeadTitle from '../Head/head';
import IntroComponent from './_components/IntroComponent';
import { useRouter } from 'next/router';
export default function Home(props) {
  const {user} = props;
  const router = useRouter();
  return (
    <React.StrictMode>
        <HeadTitle title="ZeeHome"/>
        <div className='home-main'>
            <Header user={user} router={router}/>
            <Divider />
            <Search />
            <Divider />
            <Banner />
            <Divider />
            <IntroComponent 
                title='Chúng tôi sẵn sàng tìm kiếm' 
                description='Tìm và lưu một vài căn nhà bạn thích, chúng tôi sẽ tìm kiếm giúp bạn' 
                style='left'/>
            <Divider />
            <IntroComponent 
                title='Với đội ngũ chuyên nghiệp'
                description='Chúng tôi cam kết sẽ có những gợi ý phù hợp dành cho bạn'/>
            <Divider />
            <Footer />
            <SocialBarRelative />
        </div>
    </React.StrictMode>
  )
}
