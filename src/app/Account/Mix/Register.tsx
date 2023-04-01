import React, { useState } from 'react';
import { Button, Form, Input, Select, DatePicker, notification, Checkbox } from 'antd';
import { register } from '../../../services/common';
import { checkVietNameseName, checkPhone, checkEmail } from '../../../helpers/validate';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
const optionGender = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
];
export default function RegisterIn() {
  const [formRegister] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [acceptRule, setAcceptRule] = useState(false);
  const router = useRouter();
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
        router.push({ pathname: '/account/join_zee_home', query: { tab: 'login' } });
      })
      .catch((error) => {
        setLoading(false);
        notification.error({ message: `Đăng ký không thành công ! Lỗi do ${error}` });
      });
  };
  return (
    <div className='form-register'>
      <Form form={formRegister} layout='vertical' autoComplete='none' onFinish={onFinishRegister}>
        <div className='log-reg-page-title'>Đăng Ký</div>
        <div className='group-item'>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Họ đệm'
            name='first_name'
            rules={[{ validator: validateName }]}
          >
            <Input placeholder='ex: Nguyễn Văn' autoComplete='off' />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '5px' }}
            label='Tên'
            name='last_name'
            rules={[{ validator: validateName }]}
          >
            <Input placeholder='ex: Tú, Linh, Loan,..' autoComplete='off' />
          </Form.Item>
        </div>
        <Form.Item
          style={{ marginBottom: '5px' }}
          label='Điện thoại'
          name='phone'
          rules={[{ validator: validatePhoneNumber }]}
        >
          <Input placeholder='Nhập số điện thoại của bạn' autoComplete='off' />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: '5px' }}
          label='Email'
          name='email'
          rules={[{ validator: validateEmail }]}
        >
          <Input placeholder='Nhập địa chỉ email của bạn' />
        </Form.Item>
        <div className='group-item'>
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
        </div>
        <Form.Item
          style={{ marginBottom: '5px' }}
          label='Password'
          name='password'
          rules={[{ validator: validatePassword }]}
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
                : loading
                ? 'Vui lòng đợi'
                : 'Đăng ký vào ZeeHome'
            }
            loading={loading}
            htmlType='submit'
          >
            {loading ? '' : 'Đăng ký'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

const validateName = (_: any, value: any) => {
  if (value) {
    if (!checkVietNameseName(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Sai định dạng tên !'));
    }
  } else {
    return Promise.reject(new Error('Không được để trống !'));
  }
};

const validatePhoneNumber = (_: any, value: any) => {
  if (value) {
    if (!checkPhone(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Sai số điện thoại !'));
    }
  } else {
    return Promise.reject(new Error('Không được để trống !'));
  }
};

const validateEmail = (_: any, value: any) => {
  if (value) {
    if (!checkEmail(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Sai địa chỉ Email !'));
    }
  } else {
    return Promise.reject(new Error('Không được để trống !'));
  }
};

const validatePassword = (_: any, value: any) => {
  if (value) {
    if (value.length < 8) {
      return Promise.reject(new Error('Mật khẩu phải lớn hơn 8 kí tự !'));
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.reject(new Error('Không được để trống mật khẩu !'));
  }
};
