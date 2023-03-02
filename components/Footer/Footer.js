import { FontSizeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {Form, Input, Button} from 'antd'
import { auto } from '@popperjs/core'
export default function Footer() {
  return (

    <footer className="w-100 py-4 flex-shrink-0" >
        <div className="container py-4">
            <div className="row gy-4 gx-5">
                <div className="col-lg-4 col-md-6">
                    <h5 className="h3 text-left">
                      <Image width={90} height={65} src="/static/logo/logo1.png" alt="logo" />
                    </h5>              
                    <div className='row'>
                    <div className='text-left '>
                    
                    <Link style={{textDecoration: 'none'}}  href="https://goo.gl/maps/2WDjYgVeBcUKsnTs9" className='fontAdd'>
                    <p> <i className="fa fa-map" /> Địa chỉ: 198 Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội</p> 
                    </Link>
                    
                    <p className="" ><i className="fa fa-phone fontPhone" ></i>Điện thoại: 0989999888</p>
                    <i className="fa fa-envelope fontAdd"></i> zyllow.contact@gmail.com
                    
                   
                    
                   
                      {/* <Link className='position-relative' href="#">
                        <Image width={30} height={30} src="/static/icons/facebook.png" alt='google' />
                      </Link>
                      </div>
                      <div className='col-1'>
                      <Link className='position-relative' href="#">
                        <Image width={30} height={30} src="/static/icons/icon_google.png" alt='google' />
                      </Link>
                      </div>
                      <div className='col-1'>
                      <Link className='position-relative' href="#">
                        <Image width={40} height={30} src="/static/icons/zalo.jpeg" alt='google' />
                      </Link> */}
                      </div>
                    </div>
                    
                   
                    
                </div>
                <div className="col-lg-2 col-md-6">
                    <h5 className=" mb-3">Truy cập nhanh</h5>
                    <ul className="list-unstyled text-muted">
                        <li><Link href="#" className="text-decoration-none">Trang chủ</Link></li>
                        <li><Link href="#" className="text-decoration-none">Giới thiệu</Link></li>
                        <li><Link href="#" className="text-decoration-none">Cách thức hoạt động</Link></li>
                        <li><Link href="#" className="text-decoration-none">FAQ</Link></li>
                    </ul>
                </div>
                <div className="col-lg-2 col-md-6">
                    <h5 className=" mb-3">Quick links</h5>
                    <ul className="list-unstyled text-muted">
                        <li><Link href="#" className="text-decoration-none">Home</Link></li>
                        <li><Link href="#" className="text-decoration-none">About</Link></li>
                        <li><Link href="#" className="text-decoration-none">Get started</Link></li>
                        <li><Link href="#" className="text-decoration-none">FAQ</Link></li>
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6">
                  <h5 className=" mb-3">ĐĂNG KÍ NHẬN TIN</h5>
                    <Input.Group compact>     
                      <Input
                        style={{
                        width: 'calc(100% - 150px)',
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
        </div>
    </footer>

    
  )
}
