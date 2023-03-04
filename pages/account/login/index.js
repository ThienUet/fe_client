import React from 'react'
import dynamic from 'next/dynamic';
const LoginPage = dynamic(() => import('../../../app/Account/LoginPage'))
export default function Login() {
  return (
    <div className='Login-Page'>
        <LoginPage />
    </div>
  )
}
