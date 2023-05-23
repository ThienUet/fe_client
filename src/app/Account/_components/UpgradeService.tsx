import React, { useState } from 'react';
import { Button } from 'antd';
import Wallet from './Wallet';
import { useRouter, withRouter } from 'next/router';
const UpgradeService: React.FC = () => {
  const router = useRouter();
  const [openWalletForm, setOpenWalletForm] = useState(false);

  const adminSupport = () => {
    router.push('/chat?id=a4b4ca3e-5017-40dd-9b43-e128c8f07551');
  };

  return (
    <>
      <div className='upgrade-services'>
        <label className='service-title'>Bạn muốn đăng ký dịch vụ nào ?</label>
        <div className='services-table'>
          <table className='table'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên dịch vụ</th>
                <th>Mô tả</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nạp tiền vào ví</td>
                <td>Nạp thêm tiền vào ví để sử dụng dịch vụ</td>
                <td>
                  <Button onClick={() => setOpenWalletForm(true)}>Thực hiện</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Liên hệ quản trị viên</td>
                <td>Gặp lỗi tài khoản? Liên hệ quản trị viên</td>
                <td>
                  <Button onClick={() => adminSupport()}>Liên hệ</Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Điều khoản</td>
                <td>Đọc rõ điều khoản và dịch vụ giúp bạn trở nên thông thái</td>
                <td>
                  <Button>Đọc điều khoản</Button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  Vui lòng đọc kỹ điều khoản và dịch vụ chúng tôi đề xuất và thực hiện để tránh rủi
                  ro và hoạt động một cách an toàn !
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Wallet open={openWalletForm} close={() => setOpenWalletForm(false)} />
    </>
  );
};

export default withRouter(UpgradeService);
