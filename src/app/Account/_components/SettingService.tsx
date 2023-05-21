import { Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging';
import { postFcmToken } from 'services/fcm-services';
import { deleteFcmToken } from 'services/fcm-services';

const SettingService = () => {
  const [isAllowNotification, setIsAllowNotification] = useState<boolean>(false);
  const [isEnableNotification, setIsEnableNofitication] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initializeToken = async () => {
    const messaging = getMessaging();
    try {
      const currentToken = await getToken(messaging, {
        vapidKey:
          'BPkE1nKIoKUl-s0ARYYpIR2F4QWSGi9lo3oWPj8bZt2GjAy6ufG9jSvm7exwzRwtrIIIU3twLBSbE0RWKUL525s',
      });

      if (currentToken) {
        localStorage.setItem('zeehome_fcm_status', JSON.stringify(true));
        localStorage.setItem('zeehome_fcm_token', currentToken);
        await postFcmToken({ token: currentToken });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deToken = async () => {
    const currentToken = localStorage.getItem('zeehome_fcm_token');
    if (getMessaging()) {
      await deleteToken(getMessaging());
      await deleteFcmToken({ token: currentToken });
      localStorage.removeItem('zeehome_fcm_token');
      localStorage.setItem('zeehome_fcm_status', JSON.stringify(false));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!window.Notification) {
      setIsAllowNotification(false);
    } else {
      if (Notification.permission === 'granted') {
        setIsAllowNotification(true);
        const status = JSON.parse(localStorage.getItem('zeehome_fcm_status'));
        if (status) {
          setIsEnableNofitication(true);
        } else {
          setIsEnableNofitication(false);
        }
      } else {
        setIsAllowNotification(false);
      }
    }

    // set current
  }, []);

  const onSwitchChange = (value: boolean) => {
    setIsEnableNofitication(value);
    setIsLoading(true);
    if (value) {
      isAllowNotification && initializeToken();
    } else {
      deToken();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '100px', marginTop: '16px' }}>
      <div>Nhận thông báo từ Zeehome:</div>
      <div>
        <Switch
          checkedChildren='Bật'
          unCheckedChildren='Tắt'
          checked={isEnableNotification}
          onChange={onSwitchChange}
          disabled={!isAllowNotification}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default SettingService;
