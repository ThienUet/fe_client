import { usePaymentHistory } from 'query/common';
import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import { Popconfirm, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
interface Props extends PropsWithChildren {
  formatter: any;
}

const PaymentHistory: React.FC<Props> = ({ formatter }) => {
  const { data: payment, isLoading: loading }: any = usePaymentHistory();
  const payments = payment?.payments;
  return (
    <div className='view-payment'>
      <table className='table'>
        <thead>
          <tr>
            <th>STT</th>
            <th>Thời gian</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Số tiền</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>
                <div className='spin-loader'>
                  <Spin />
                </div>
              </td>
            </tr>
          ) : (
            payments?.map((payment: any, index: any) => {
              return (
                <tr key={index} className='table-item'>
                  <td>{index + 1}</td>
                  <td>{moment(payment.createdAt).format('DD-MM-YYYY vào HH:mm')}</td>
                  <td>{payment.paymentDescription}</td>
                  <td style={{ color: payment.state === 'done' ? '#00cc00' : '#ff8c1a' }}>
                    {payment.state === 'done' ? 'Đã nạp' : 'Đang chờ'}
                  </td>
                  <td>{formatter.format(payment.total / 100)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
