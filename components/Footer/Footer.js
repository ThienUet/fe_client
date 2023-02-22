import { FontSizeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
export default function Footer() {
  return (

    <footer className="w-100 py-4 flex-shrink-0" >
        <div className="container py-4">
            <div className="row gy-4 gx-5">
                <div className="col-lg-4 col-md-6">
                    <h5 className="h1  ">Liên hệ</h5>
                    <div className='row'>
                    <div className='col-1'>
                      <Link className='position-relative' href="#">
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
                        <Image width={30} height={30} src="/static/icons/twitter.png" alt='google' />
                      </Link>
                      </div>
                    </div>
                    
                    <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                    <p className="small text-muted mb-0">&copy; Copyrights. All rights reserved. <Link className="text-primary" href="#">Bootstrapious.com</Link></p>
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
                    <h5 className=" mb-3">Newsletter</h5>
                    <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                    <form action="#">
                       
                    </form>
                </div>
            </div>
        </div>
    </footer>

    
  )
}
