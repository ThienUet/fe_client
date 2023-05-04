import React from 'react';
import { Form, notification, Input, Button } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordService } from 'services/common';

const ForgotPassword: React.FC = () => {
  const [formForgot] = Form.useForm();
  const onSuccess = () => {
    notification.success({
      message: 'Gửi email thành công ! Vui lòng check email để lấy lại mật khẩu',
    });
  };
  const onError = (error) => {
    notification.error({ message: error?.exMessage || 'Gửi email thất bại !' });
  };

  const { mutate, isLoading: loading } = useMutation({
    onSuccess: onSuccess,
    onError: onError,
    mutationFn: (body) => resetPasswordService(body),
  });

  const resetPassword = () => {
    const value = formForgot.getFieldsValue();
    mutate(value);
  };
  return (
    <div className='forgot-password'>
      <Form form={formForgot} onFinish={resetPassword}>
        <div className='title'>Quên mật khẩu</div>
        <p>
          Hãy điền địa chỉ email của bạn và bấm nút quên mật khẩu, hệ thống sẽ khôi phục mật khẩu
          nếu như đã có tài khoản tồn tại
        </p>
        <Form.Item name='email' label='Điền địa chỉ email: '>
          <Input />
        </Form.Item>
        <div className='btn-forgot-pass'>
          <Button loading={loading} htmlType='submit' type='primary'>
            Xác nhận
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
