import React, { ReactElement, useEffect } from 'react';
import { getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging';
import './../../utils/firebase';
import { User } from 'type/user';
import { postFcmToken } from 'services/fcm-services';
import { useRouter } from 'next/router';
import { initializeAppFcm } from './../../utils/firebase';

interface Props {
  children: ReactElement;
  user: User;
}

const FireBaseMessagingLayout = ({ children, user }: Props) => {
  const router = useRouter();

  const initializeToken = () => {
    console.log('initialize token!');
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        'BPkE1nKIoKUl-s0ARYYpIR2F4QWSGi9lo3oWPj8bZt2GjAy6ufG9jSvm7exwzRwtrIIIU3twLBSbE0RWKUL525s',
    })
      .then((currentToken: string) => {
        if (currentToken) {
          localStorage.setItem('zeehome_fcm_status', JSON.stringify(true));
          localStorage.setItem('zeehome_fcm_token', currentToken);
          postFcmToken({ token: currentToken });
        } else {
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  };

  useEffect(() => {
    initializeAppFcm();

    const zeehome_fcm_token = localStorage.getItem('zeehome_fcm_token');
    const zeehome_fcm_status = localStorage.getItem('zeehome_fcm_status');

    if (zeehome_fcm_status == null && zeehome_fcm_token == null && user) {
      if (!window.Notification) {
        console.log('Browser does not support notifications.');
      } else {
        if (Notification.permission === 'granted') {
          initializeToken();
        } else {
          Notification.requestPermission()
            .then(function () {
              initializeToken();
            })
            .catch(function () {
              localStorage.setItem('zeehome_fcm_status', JSON.stringify(false));
              localStorage.setItem('zeehome_fcm_token', '');
            });
        }
        console.log('browser support');
      }
    }
    onMessage(getMessaging(), (payload) => {
      const noti = new Notification('Zeehome chat!', {
        body: `bạn có tin nhắn mới từ ${payload.data.fromFirstName} ${payload.data.fromLastName}`,
        icon: 'https://bit.ly/2DYqRrh',
      });
      noti.onclick = () => {
        router.push(`/chat?id=${payload.data.fromId}`);
      };
    });
  }, []);

  return <div>{children}</div>;
};

export default FireBaseMessagingLayout;
