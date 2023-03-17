import { Button, Form } from 'antd';
import CustomUploadFile from 'components/form/custom-upload-file';
import CustomUploadFiles from 'components/form/custom-upload-files';
import React from 'react';

const Test = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '100px' }}>
      <Form
        form={form}
        name='form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item name='images'>
          <CustomUploadFiles type='image' />
        </Form.Item>
        <Form.Item name='thumbnail'>
          <CustomUploadFile type='image'></CustomUploadFile>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Test;
