import React, { useState } from 'react';
import { Form, Input, Button, notification, Modal } from 'antd';
import Link from 'next/link';
import { Login } from 'services/common';
import * as Auth from '../../../storages/Auth';
import ForgotPassword from '../_components/ForgotPassword';
const LoginForm: React.FC = () => {
  const [forgotOpen, setForgotOpen] = useState(false);
  const [formLogin] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const callBackResult = (result: any) => {
    if (result) {
      window.location.replace('/account');
    } else {
      notification.error({ message: 'Đăng nhập thất bại !' });
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const resetPassword = () => {
    setForgotOpen(true);
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
    <div className='login-form'>
      <Form
        form={formLogin}
        autoComplete='none'
        layout='vertical'
        onFinish={onFinishLogin}
        scrollToFirstError
      >
        <div className='log-reg-page-title'>Đăng nhập</div>
        <div className='log-reg-page-welcome'>
          <label>Chào mừng bạn quay trở lại ZeeHome !</label>
        </div>
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
          <label className='log-reg-page-forgot-link' onClick={resetPassword}>
            Quên mật khẩu ?
          </label>
        </div>
        <div className='log-reg-page-btn'>
          <Button loading={loading} type='primary' htmlType='submit'>
            {loading ? '' : 'Đăng nhập'}
          </Button>
        </div>
      </Form>
      <Modal
        className='modal-forgot-password'
        open={forgotOpen}
        onCancel={() => setForgotOpen(false)}
        closable={false}
        footer={
          <Button type='primary' onClick={() => setForgotOpen(false)}>
            Hủy
          </Button>
        }
        maskClosable
      >
        <ForgotPassword />
      </Modal>
    </div>
  );
};

const validateNotNull = (_: any, value: any) => {
  if (value) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Vui lòng nhập đầy đủ thông tin !'));
  }
};

export default LoginForm;
