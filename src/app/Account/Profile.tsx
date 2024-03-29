import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import { Divider } from 'antd';
import ProfileComponent from './_components/ProfileComponent';
import LoginIn from '../../components/Dropdown/_components/Login';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FireBaseMessagingLayout from 'components/fcm';
import SocialBarRelative from 'components/SocialBarRelative/SocialBarRelative';
interface Props {
  user: any;
  userRefetch: any;
}
export default function Profile({ user, userRefetch }: Props) {
  console.log(user);
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
    <FireBaseMessagingLayout user={user}>
      <div>
        {user ? (
          <>
            <Head>
              <title>Trang cá nhân</title>
            </Head>
            <div className='main-profile'>
              <Divider />
              <div className='profile-content'>
                <ProfileComponent userRefetch={userRefetch} user={user} />
              </div>
              <Divider />
              <Footer />
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
      </div>
    </FireBaseMessagingLayout>
  );
}
