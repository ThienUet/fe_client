import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker, notification, Checkbox } from 'antd';
import { register } from '../../../services/common';
import moment from 'moment/moment';
const optionGender = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
];
export default function RegisterIn({
  setOnLoginOpen,
  onRegisterOpen,
  setOnRegisterOpen,
}: {
  setOnLoginOpen: any;
  onRegisterOpen: any;
  setOnRegisterOpen: any;
}) {
  const [formRegister] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [acceptRule, setAcceptRule] = useState(false);
  const onFinishRegister = async () => {
    const data = formRegister.getFieldsValue();
    const body = {
      gender: data.gender,
      phoneNumber: data.phone,
      birthDate: data.birthDate,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
      intro: 'Some thing need EDIT !',
      image:
        data.gender === 'male'
          ? '/static/icons/male_avatar.png'
          : '/static/icons/female_avatar.jpg',
      registerAt: moment(),
      banned: true,
      avgRating: '2',
    };
    setLoading(true);
    await register(body)
      .then(() => {
        notification.success({ message: `Đăng ký thành công ! Vui lòng đăng nhập !` });
        setLoading(false);
        setOnRegisterOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        notification.error({ message: `Đăng ký không thành công ! Lỗi do ${error}` });
      });
  };
  return (
    <div>
      <div
        className='modal-log-reg-title'
        onClick={() => {
          setOnRegisterOpen(true), setOnLoginOpen(false);
        }}
      >
        Đăng ký
      </div>
      <Modal
        style={{ padding: '20px' }}
        open={onRegisterOpen}
        cancelText='Huỷ'
        onCancel={() => setOnRegisterOpen(false)}
        closable={true}
        footer={null}
      >
        <Form form={formRegister} layout='vertical' autoComplete='none' onFinish={onFinishRegister}>
          <div className='log-reg-page-title'>Đăng Ký</div>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Họ đệm'
            name='first_name'
            // rules={[{ validator: validateName }]}
          >
            <Input placeholder='ex: Nguyễn Văn' autoComplete='off' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Tên'
            name='last_name'
            // rules={[{ validator: validateName }]}
          >
            <Input placeholder='ex: Tú, Linh, Loan,..' autoComplete='off' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Điện thoại'
            name='phone'
            // rules={[{ validator: validatePhoneNumber }]}
          >
            <Input placeholder='Nhập số điện thoại của bạn' autoComplete='off' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Email'
            name='email'
            // rules={[{ validator: validateEmail }]}
          >
            <Input placeholder='Nhập địa chỉ email của bạn' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Giới tính'
            name='gender'
            rules={[{ required: true, message: 'Chưa chọn giới tính !' }]}
          >
            <Select options={optionGender} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Ngày sinh'
            name='birthDate'
            rules={[{ required: true, message: 'Chưa chọn ngày sinh !' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Password'
            name='password'
            // rules={[{ validator: validatePassword }]}
          >
            <Input.Password placeholder='Nhập mật khẩu của bạn' autoComplete='new-password' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Nhập lại mật khẩu'
            name='re-password'
            rules={[
              {
                validator: (_, value) => {
                  if (value) {
                    if (value !== formRegister.getFieldsValue().password) {
                      return Promise.reject(new Error('Không trùng mật khẩu !'));
                    } else {
                      return Promise.resolve();
                    }
                  } else {
                    return Promise.reject(new Error('Không được để trống'));
                  }
                },
              },
            ]}
          >
            <Input.Password placeholder='Nhập mật khẩu của bạn' autoComplete='new-password' />
          </Form.Item>
          <div className='log-reg-accept-rule'>
            <Checkbox
              onChange={(e) => {
                console.log(e.target.checked);
                setAcceptRule(e.target.checked);
              }}
            >
              Tôi đồng ý với điều khoản và quy định đặt ra
            </Checkbox>
          </div>
          <div className='log-reg-page-btn'>
            <Button
              disabled={!acceptRule}
              title={
                !acceptRule
                  ? 'Bạn phải đồng ý với điều khoản của chúng tôi !'
                  : 'Đăng nhập vào ZeeHome'
              }
              loading={loading}
              htmlType='submit'
            >
              {loading ? 'Vui lòng đợi' : 'Đăng ký'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
