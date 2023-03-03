import React, { useState } from 'react';
import { Button, Form, Modal, Input } from 'antd';

export default function LoginPage() {
    const [open, setOpen] = useState(false);

  return (
    <div className='login-page'>
        <Form>
            <Form.Item 
                label='User name'
                name='username'>
                    <Input />
            </Form.Item>
        </Form>
    </div>
  )
}
