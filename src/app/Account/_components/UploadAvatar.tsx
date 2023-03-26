import { Button, notification, Modal } from 'antd';
import React, { useState } from 'react';
import CustomUpLoadFile from '../../../components/form/custom-upload-file/index';
import { Form } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { updateUserInfo } from 'services/common';
interface Props {
  user: any;
  userRefetch: any;
}

const UploadAvatar = (props: Props) => {
  const { user } = props;
  const { userRefetch } = props;
  console.log(user);
  const [onOpen, setOnOpen] = useState(false);
  const [formUpload] = Form.useForm();
  const onSuccess = () => {
    notification.success({
      message: 'Cập nhật ảnh đại diện thành công !',
    });
    userRefetch();
    setOnOpen(false);
  };
  const onError = (error: any) => {
    notification.error({
      message: `Cập nhật ảnh đại diện thất bại! Do ${error?.exMessage}`,
    });
  };
  const { mutate, isLoading: loading } = useMutation({
    onError: onError,
    onSuccess: onSuccess,
    mutationFn: (body) => updateUserInfo(body),
  });

  const onSubmit = () => {
    const value = formUpload.getFieldsValue();
    const newBody = {
      gender: user.gender || '',
      phoneNumber: user.phoneNumber || '',
      intro: user.intro || '',
      image: value.upload_avartar.fileUrl,
      birthDate: user.birthDate || '',
      firstName: user.firstName || '',
      lastName: user.lastName,
    };
    mutate(newBody);
  };

  return (
    <>
      <Button onClick={() => setOnOpen(true)}>Sửa ảnh</Button>
      <Modal open={onOpen} onCancel={() => setOnOpen(false)} footer={false}>
        <Form form={formUpload} onFinish={onSubmit}>
          <Form.Item name='upload_avartar'>
            <CustomUpLoadFile type='image' />
          </Form.Item>
          <div className='btn-upload-submit d-flex justify-content-center'>
            <Button loading={loading} htmlType='submit'>
              Xác nhận
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default UploadAvatar;
