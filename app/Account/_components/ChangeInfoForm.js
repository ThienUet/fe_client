import React, {useEffect, useState} from 'react'
import { Form, Button, Input, DatePicker, Select, AutoCenter, Checkbox, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { useMutation } from '@tanstack/react-query';
import { updateUserInfo } from '@/services/common';
import { checkPhone } from '@/helpers/validate';
const optionGender =[
  {value: 'male', label: 'Nam'},
  {value: 'female', label: 'Nữ'}
]

export default function ChangeInfoForm({user, userRefetch}) {
  const [formChangeInfo] = Form.useForm();
  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    gender: user?.gender,
    email: user?.email,
    intro: user?.intro,
    phoneNumber: user?.phoneNumber
  }

  const onChangeCheck = (e) => {
    let flag = e.target.checked;
    if (flag === true) {
      setDisableInput(false);
    } else {
      setDisableInput(true);
    }
  }

  const onSuccess = () => {
    notification.success({message: 'Cập nhật thông tin thành công !'});
    userRefetch();
  }

  const onError = (error) => {
    notification.error({message: `Cập nhật thông tin thất bại ! Do lỗi ${error?.exMessage}` });
    console.log(error);
  }     

  const {mutate, isLoading: loading} = useMutation({
    onError: onError,
    onSuccess: onSuccess,
    mutationFn: (body) => updateUserInfo(body)
  })

  const onSubmit = () => {
    const body = formChangeInfo.getFieldsValue();
    const newBody = {
      ...body,
      image: user?.image,
      birthDate: body.birthDate === undefined ? user?.birthDate : body.birthDate,
    }
    mutate(newBody);
    
  }
  return (
    <div className='change-info-form'>
      <Form initialValues={initialValues} form={formChangeInfo} layout="vertical" onFinish={onSubmit}>
        <div className='form-title'>Chỉnh sửa thông tin cá nhân</div>
        <Form.Item label='Họ đệm' name='firstName' tooltip={{title: 'Không thay đổi vì chính sách của ZeeHome, Hãy liên hệ quản trị viên !'}}>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label='Tên' name='lastName' tooltip={{title: 'Không thay đổi vì chính sách của ZeeHome, Hãy liên hệ quản trị viên !'}}>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label='Ngày sinh' name='birthDate'>
          <DatePicker  placeholder={user?.birthDate} style={{width: '100%'}} />
        </Form.Item>
        <Form.Item label='Giới tính' name='gender'>
          <Select  options={optionGender}/>
        </Form.Item>
        <Form.Item label='Email' name='email' tooltip={{title: 'Không thay đổi vì chính sách của ZeeHome, Hãy liên hệ quản trị viên !'}}>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label='Số điện thoại' name='phoneNumber' rules={[{validator: validatePhoneNumber}]}>
          <Input />
        </Form.Item>
        <Form.Item label='Tiểu sử' name='intro' rules={[{required: true, message: 'Không được để trống !'}]}>
          <TextArea rows={6} showCount maxLength={255}  />
        </Form.Item>
        <div className='btn-confirm'><Button htmlType='submit'>Xác nhận</Button></div>
      </Form>
    </div>
  )
}

const validatePhoneNumber = (_, value) => {
  if (value) {
      if (!checkPhone(value)) {
          return Promise.resolve();
      } else {
          return Promise.reject(new Error('Sai số điện thoại !'))
      }
  } else {
      return Promise.reject(new Error("Không được để trống !"));
  }
}