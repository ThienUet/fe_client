import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Divider } from 'antd';
import SocialBarRelative from '../../components/SocialBarRelative/SocialBarRelative';
import ProfileComponent from './_components/ProfileComponent';
import LoginIn from '../../components/Dropdown/_components/Login';
import { useRouter } from 'next/router';
import Head from 'next/head';
interface Props {
  user: any;
  userRefetch: any;
}
export default function Profile({ user, userRefetch }: Props) {
  const router = useRouter();
  const [openLogin, setOpenLogin] = useState(false);
  useEffect(() => {
    if (user) {
      setOpenLogin(false);
    } else {
      setOpenLogin(true);
    }
  }, [user, setOpenLogin]);
  return (
    <React.StrictMode>
      {user ? (
        <>
          <Head>
            <title>Trang cá nhân</title>
          </Head>
          <div className='main-profile'>
            <Header user={user} router={router} />
            <Divider />
            <div className='profile-content'>
              <ProfileComponent userRefetch={userRefetch} user={user} />
            </div>
            <Divider />
            <Footer />
            <SocialBarRelative />
          </div>
        </>
      ) : (
        <>
          <Head>
            <title>Đăng nhập</title>
          </Head>
          <LoginIn
            showText={false}
            router={router}
            onLoginOpen={openLogin}
            setOnLoginOpen={setOpenLogin}
          />
        </>
      )}
    </React.StrictMode>
  );
}
