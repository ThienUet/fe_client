import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import HeadTitle from '../components/Head/head';
import Banner from '@/components/Banner/Banner';
import { Divider } from 'antd';
export default function Home() {
  return (
    <>
      <HeadTitle title={"Trang chủ"} />
      <div className='app'>
        <Header />
        <Divider />
        <Banner />
        <div className='body'>

        </div>
        <Footer />
      </div>
    </>
  )
}
