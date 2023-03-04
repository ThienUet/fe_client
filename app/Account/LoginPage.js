import React, { useState } from 'react';
import { Button, Form, Modal, Input } from 'antd';

export default function LoginPage({title}) {
    const [open, setOpen] = useState(false);
    const onCancel = () => {
        setOpen(false);
    }
  return (
    <div className='login-page'>
        <Modal 
            open={open}
            title={title}
            cancelText='Huỷ'
            >
            <Form>
                <div className='login-page-title'>Đăng nhập</div>
                <Form.Item
                    label='User name'
                    name='username'>
                    <Input placeholder='Nhập tài khoản của bạn' autoComplete='off'/>
                </Form.Item>
                <Form.Item 
                    label='Password'
                    name='password'>
                    <Input.Password placeholder='Nhập mật khẩu của bạn' autoComplete='off'/>
                </Form.Item>
                <Button>
                    Đăng nhập
                </Button>

            </Form>
        </Modal>
    </div>
  )
}
