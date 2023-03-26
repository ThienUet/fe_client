import React, { useState } from 'react';
import { Form, Modal, Input, Button, notification } from 'antd';
import Link from 'next/link';
import { Login } from '../../../services/common';
import * as Auth from '../../../storages/Auth';

interface Props {
  showText?: any;
  onLoginOpen?: any;
  setOnLoginOpen?: any;
  setOnRegisterOpen?: any;
  router?: any;
}

export default function LoginIn({
  showText,
  onLoginOpen,
  setOnLoginOpen,
  setOnRegisterOpen,
  router,
}: Props) {
  const [formLogin] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const callBackResult = (result) => {
    if (result) {
      if (router?.query?.next) {
        window.location.replace(router?.query?.next);
      } else if (router?.pathname !== '' && router?.pathname !== undefined) {
        window.location.replace(router?.pathname);
      } else {
        router.push('/');
      }
    } else {
      notification.error({ message: 'Đăng nhập thất bại !' });
    }
  };

  const onFinishLogin = async () => {
    const data = formLogin.getFieldsValue();
    const body = {
      client_id: 'backend',
      username: data.username,
      password: data.password,
      grant_type: 'password',
      client_secret: '11UJJdC8M4fx3C7YzdlD2X9ruVcC9W3j',
    };
    setLoading(true);
    await Login(body)
      .then(({ data }) => {
        if (data.access_token) {
          Auth.authenticateUser(
            data.access_token,
            data.refresh_token,
            data.expires_in,
            data.refresh_expires_in,
          );
          setOnLoginOpen(false);
          callBackResult(!!data.access_token);
          setLoading(false);
        }
      })
      .catch(() => {
        notification.error({ message: `Sai tài khoản hoặc mật khẩu !` });
        setLoading(false);
      });
  };
  return (
    <div>
      <div
        className='modal-log-reg-title'
        onClick={() => {
          setOnLoginOpen(true);
          setOnRegisterOpen(false);
        }}
      >
        {showText && 'Đăng nhập'}
      </div>
      <Modal
        open={onLoginOpen}
        onCancel={() => {
          setOnLoginOpen(false);
          window.location.replace('/');
        }}
        closable={true}
        footer={null}
      >
        <Form
          form={formLogin}
          autoComplete='none'
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={onFinishLogin}
          scrollToFirstError
        >
          <div className='log-reg-page-title'>Đăng nhập</div>
          <div className='log-reg-notice'>{!showText && 'Bạn phải đăng nhập trước !'}</div>
          <Form.Item
            label='Tài khoản'
            name='username'
            rules={[{ required: true, validator: validateNotNull }]}
          >
            <Input placeholder='Nhập tài khoản của bạn' autoComplete='off' />
          </Form.Item>
          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[{ required: true, validator: validateNotNull }]}
          >
            <Input.Password placeholder='Nhập mật khẩu của bạn' autoComplete='new-password' />
          </Form.Item>
          <div className='log-reg-page-forgot'>
            <Link className='log-reg-page-forgot-link' href={'#'}>
              Quên mật khẩu ?
            </Link>
          </div>
          <div className='log-reg-page-btn'>
            <Button loading={loading} type='primary' htmlType='submit'>
              {loading ? 'Vui lòng đợi' : 'Đăng nhập'}
            </Button>
          </div>
          <div>
            Chưa có tài khoản ? <div>Đăng kí</div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

const validateNotNull = (_: any, value: any) => {
  if (value) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Vui lòng nhập đầy đủ thông tin !'));
  }
};
