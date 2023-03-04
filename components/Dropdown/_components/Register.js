import React, { useState } from 'react'
import { Modal, Button, Form, Input, Select, Option, DatePicker } from 'antd';
import Link from 'next/link';
const optionGender =[
    {value: 'Nam', label: 'Nam'},
    {value: 'Nữ', label: 'Nữ'}
]
export default function Register({setOnLoginOpen, onRegisterOpen, setOnRegisterOpen}) {
    const [formRegister] = Form.useForm();
    const onFinishRegister = () => {
        const n = formRegister.getFieldValue();
        console.log(n);
        formRegister.resetFields();
    }
  return (
    <>
    <div className='modal-log-reg-title' href='#' onClick={() => {setOnRegisterOpen(true), setOnLoginOpen(false)}}>Đăng ký</div>
        <Modal 
            style={{padding: '20px'}}
            open={onRegisterOpen}
            cancelText='Huỷ'
            onCancel={() => setOnRegisterOpen(false)}
            closable={true}
            footer={null}
            >
            <Form
                form={formRegister}
                layout='vertical'
                autoComplete='none'
                onFinish={onFinishRegister}
                >
                <div className='log-reg-page-title'>Đăng Ký</div>
                <Form.Item
                    style={{marginBottom: '5px'}}
                    label='Họ đệm'
                    name='first_name'>
                    <Input placeholder='ex: Nguyễn Văn' autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    style={{marginBottom: '5px'}}
                    label='Tên'
                    name='last_name'>
                    <Input placeholder='ex: Tú, Linh, Loan,..' autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    style={{marginBottom: '5px'}}
                    label='Điện thoại'
                    name='phone'>
                    <Input placeholder='Nhập số điện thoại của bạn' autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    style={{marginBottom: '5px'}}
                    label='Email'
                    name='email'>
                    <Input placeholder='Nhập tài khoản của bạn' autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    style={{marginBottom: '5px'}}
                    label='Giới tính'
                    name='gender'
                    >
                    <Select options={optionGender}/>
                </Form.Item>
                <Form.Item
                    style={{marginBottom: '5px'}}
                    label='Ngày sinh'
                    name='birthDate'
                    >
                    <DatePicker style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item
                    style={{marginBottom: '5px'}} 
                    label='Password'
                    name='password'>
                    <Input.Password placeholder='Nhập mật khẩu của bạn' autoComplete="new-password" />
                </Form.Item>
                <Form.Item
                    style={{marginBottom: '5px'}} 
                    label='Nhập lại mật khẩu'
                    name='re-password'>
                    <Input.Password placeholder='Nhập mật khẩu của bạn' autoComplete="new-password" />
                </Form.Item>
                <div className='log-reg-page-btn'>
                    <Button htmlType='submit'>Đăng ký</Button>
                </div>

            </Form>
        </Modal>
        </>
  )
}
