import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import Link from 'next/link';
export default function Login({onLoginOpen, setOnLoginOpen, setOnRegisterOpen}) {
    const [formLogin] = Form.useForm();
    const onFinishLogin = () => {
        let n = formLogin.getFieldValue();
        console.log(n);
        formLogin.resetFields();
    }
  return (
    <>
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
    </>
  )
}

const validateNotNull = (_, value) => {
    if (value) {
        return Promise.resolve();
    } else {
        return Promise.reject(new Error("Vui lòng nhập đầy đủ thông tin !"));
    }
}