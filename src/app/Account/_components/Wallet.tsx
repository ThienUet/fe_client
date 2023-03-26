import React, { useState } from 'react';
import { Form, Modal, Button, Input, notification, Radio } from 'antd';
import { recharge_wallet_vnpay, recharge_wallet_manual } from '../../../services/user-services';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface Props {
  open: boolean;
  close: any;
}

const Wallet: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const open = props.open;
  const close = props.close;
  const [walletForm] = Form.useForm();
  const onSuccess = () => {
    notification.success({ message: 'Đang thực hiện !' });
    close();
  };
  const onError = () => {
    notification.error({ message: 'Có lỗi xảy ra, vui lòng thử lại' });
  };
  const mutateVnpay = useMutation({
    onError: onError,
    onSuccess: onSuccess,
    mutationFn: (body: any) =>
      recharge_wallet_vnpay(body).then((data: any) => window.location.replace(data)),
  });
  const mutateManual = useMutation({
    onError: onError,
    onSuccess: onSuccess,
    mutationFn: (body: any) =>
      recharge_wallet_manual(body).then(() => {
        router.push({ pathname: '/account', query: { profileTab: 'payment-history' } });
      }),
  });
  const onSubmitWallet = () => {
    const value = walletForm.getFieldsValue();
    const body: any = {
      amount: value.amount * 100,
      orderAttachment: 'string',
    };
    if (value.style_recharge === 'vn-pay') {
      mutateVnpay.mutate(body);
    } else {
      mutateManual.mutate(body);
    }
  };
  return (
    <div className='wallet'>
      <Modal
        open={open}
        closable={false}
        footer={
          <Button
            className='btn-cancel'
            onClick={() => {
              close(false);
              walletForm.resetFields();
            }}
          >
            Hủy
          </Button>
        }
      >
        <Form className='wallet-form' form={walletForm} onFinish={onSubmitWallet} layout='vertical'>
          <div className='wallet-form-component'>
            <label className='title'>Nạp tiền vào ví</label>
            <div className='content'>
              <div className='way'>
                <label>Cách 1: Nạp tiền thủ công qua QR CODE</label>
                <p>
                  Chúng tôi sẽ tạo QR cho bạn và bạn sẽ thực hiện thanh toán, Sau đó chúng tôi sẽ xử
                  lí giúp bạn !
                </p>
              </div>
              <div className='way'>
                <label>Cách 2: Nạp tiền qua VNPAY</label>
                <p>
                  Bạn tiến hành nạp tiền qua VNPAY, sau đó tài khoản sẽ tự động được thêm tiền !
                </p>
              </div>
            </div>
            <Form.Item
              name='style_recharge'
              label='Cách thanh toán'
              rules={[{ required: true, message: 'Chưa chọn cách thanh toán !' }]}
            >
              <Radio.Group>
                <Radio value='normal'>Nạp tiền thủ công qua QR CODE</Radio>
                <Radio value='vn-pay'>Nạp tiền qua VN-PAY</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name='amount' label='Số tiền nạp'>
              <Input placeholder='Nhập số tiền cần nạp' />
            </Form.Item>
            <div className='btn-submit-wallet'>
              <Button loading={mutateManual.isLoading || mutateVnpay.isLoading} htmlType='submit'>
                Nạp tiền
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Wallet;
