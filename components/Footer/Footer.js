import { FontSizeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import {Form, Input, Button, Divider} from 'antd';
import { auto } from '@popperjs/core';
import Image from '../Image/CustomImage';

export default function Footer() {
  return (

    <footer className="w-100 pt-4 flex-shrink-0 " >
        <div className="container pt-4 p-0">
            <div className="row gy-4 gx-5 footer">
                <div className="col-lg-4 col-md-6">
                    <h5 className="h3 text-left">
                      <div className='text-center'>
                      <Image className="footer-image" src="/static/logo/logo.png" alt="logo" />
                      </div>
                    </h5>              
                    <div className='row'>
                      <div className='text-left '>
                        <div className='footer-text'>                      
                          <Link style={{textDecoration: 'none'}}  href="https://goo.gl/maps/2WDjYgVeBcUKsnTs9" className='fontAdd'>
                            <p> <i className="fa fa-map" /> Địa chỉ: 198 Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội</p> 
                          </Link>                 
                           <p className="" ><i className="fa fa-phone fontPhone" ></i>Điện thoại: 0989999888</p>                  
                            <i className="fa fa-envelope fontAdd"></i> zyllow.contact@gmail.com                   
                        </div>
                     </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6" >
                    <h5 className=" mb-3">Truy cập nhanh</h5>
                    <ul className="list-unstyled text-muted " >
                        <li><Link href="#" className="text-decoration-none link-text">Trang chủ</Link></li>
                        <li><Link href="#" className="text-decoration-none link-text">Giới thiệu</Link></li>
                        <li><Link href="#" className="text-decoration-none link-text">Cách thức hoạt động</Link></li>
                        <li><Link href="#" className="text-decoration-none link-text">Câu hỏi thường gặp </Link></li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className=" mb-3 fast-search">Tìm kiếm nhanh</h5>
                    <ul className="list-unstyled text-muted  ">
                        <li><Link href="#" className="text-decoration-none link-text">Phòng trọ Hà Nội</Link></li>
                        <li><Link href="#" className="text-decoration-none link-text">Phòng trọ Hồ Chí Minh</Link></li>
                        <li><Link href="#" className="text-decoration-none link-text">Phòng trọ Đà Nẵng</Link></li>
                        <li><Link href="#" className="text-decoration-none link-text">Phòng trọ Đồng Nai</Link></li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6  ">
                  <h5 className=" mb-3">ĐĂNG KÍ NHẬN TIN</h5>
                    <Input.Group compact>     
                      <Input
                        style={{
                        width: 'calc(100% - 60px)',
                       }}
                        placeholder="Nhập email của bạn"
                      />
                     <Button type="primary">Gửi</Button>
                    </ Input.Group>
                    <div className='footer-social'>
                      <Link href="#" className='social'>
                        <i className="fa fa-facebook-official md" aria-hidden="true"></i>
                      </Link>
                      
                      <Link href="" className='social'>
                        <i className="fa fa-telegram" aria-hidden="true"></i>
                      </Link>
                      <Link href="" className='social'>
                        <i className="fa fa-instagram" aria-hidden="true"></i> 
                      </Link>
                      <Link href="" className='social'>
                        <i className="fa fa-twitter" aria-hidden="true"></i> 
                      </Link>
                    </div>
               </div>
            </div>
            <div className='copyright'>
            <Divider /> <p> &copy; Copyright Duong Thai Huy, Tran Quang Huy, Vi Quoc Thien, Hoang Van Luong Web`s Developer</p>
            </div>
        </div>
    </footer>

    
  )
}
