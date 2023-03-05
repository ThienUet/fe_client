import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, Button, notification } from 'antd';
import Link from 'next/link';
import { Login } from '@/services/common';
import * as Auth from '@/storages/Auth'; 
export default function LoginIn({onLoginOpen, setOnLoginOpen, setOnRegisterOpen, router}) {
    const [formLogin] = Form.useForm();

    const callBackResult = (result) => {
        if (result) {
            if (router?.query?.next) {
                window.location.replace(router?.query?.next);
            } else {
                window.location.replace('/');
            }
        } else {
            notification.error({message: 'Đăng nhập thất bại !'})
        }
    }

    const onFinishLogin = () => {
        let data = formLogin.getFieldValue();
        const body = {
            client_id: 'backend',
            username: data.username,
            password: data.password,
            grant_type: 'password',
            client_secret: '11UJJdC8M4fx3C7YzdlD2X9ruVcC9W3j'
        }
        Login(body).then(({data}) => {
            if(data.access_token) {
                Auth.authenticateUser(data.access_token, data.refresh_token, data.expires_in, data.refresh_expires_in);
                notification.success({message: `Đăng nhập thành công !`});
                setOnLoginOpen(false);
                callBackResult(!!data.access_token);
            }
            console.log(data);
        }).catch(() => {
            notification.error({message: `Sai tài khoản hoặc mật khẩu !`});
        })
    }
  return (
    <div>
        <div className='modal-log-reg-title' onClick={() => {setOnLoginOpen(true); setOnRegisterOpen(false)}}>Đăng nhập</div>
        <Modal 
            open={onLoginOpen}
            cancelText='Huỷ'
            onCancel={() => {setOnLoginOpen(false)}}
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
                <Form.Item
                    label='Tài khoản'
                    name='username'
                    rules={[{required: true, validator: validateNotNull}]}
                    >
                    <Input placeholder='Nhập tài khoản của bạn' autoComplete='off'/>
                </Form.Item>
                <Form.Item 
                    label='Mật khẩu'
                    name='password'
                    rules={[{required: true, validator: validateNotNull}]}
                    >
                    <Input.Password placeholder='Nhập mật khẩu của bạn' autoComplete='new-password'/>
                </Form.Item>
                <div className='log-reg-page-forgot'>
                    <Link className='log-reg-page-forgot-link' href={'#'}>Quên mật khẩu ?</Link>
                </div>
                <div className='log-reg-page-btn'>
                    <Button type='primary' htmlType='submit'>Đăng nhập</Button>
                </div>
            </Form>
        </Modal>
    </div>
  )
}

const validateNotNull = (_, value) => {
    if (value) {
        return Promise.resolve();
    } else {
        return Promise.reject(new Error("Vui lòng nhập đầy đủ thông tin !"));
    }
}