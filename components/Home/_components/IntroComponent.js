import React from 'react'
import Image from '@/components/Image/CustomImage'
export default function IntroComponent({title, description, style}) {
    let bg = '';
    if (style === 'left') {
        bg = '#f9f9fb';
    }
  return (
    <div style={{backgroundColor: bg}} className='intro-component'>
        <div style={{height: '100%'}} className='row justify-content-center'>
            {
                style === 'left' ? (<>
                    <div className='col-3 d-flex justify-content-center flex-column'>
                <div className='intro-component-title'>{title}</div>
                <div className='intro-component-description'>{description}</div>
            </div>
            <div className='col-7 d-flex justify-content-center align-items-center'>
                <ul className='intro-component-picture'>
                    <li className="intro-component-picture-item">
                        <Image src={'/static/banner/pexels-photo-298723.png'} objectFit='cover' alt={'picture'}/>
                    </li>
                    <li className="intro-component-picture-item">
                        <Image src={'/static/banner/pexels-photo-298723.png'} objectFit='cover' alt={'picture'}/>
                    </li>
                    <li className="intro-component-picture-item">
                        <Image src={'/static/banner/pexels-photo-298723.png'} objectFit='cover' alt={'picture'}/>
                    </li>
                </ul>
            </div>
                
                </>) : (
                    <>
            <div className='col-7 d-flex justify-content-center align-items-center'>
                <ul className='intro-component-picture'>
                    <li className="intro-component-picture-item">
                        <Image src={'/static/banner/pexels-photo-298723.png'} objectFit='cover' alt={'picture'}/>
                    </li>
                    <li className="intro-component-picture-item">
                        <Image src={'/static/banner/pexels-photo-298723.png'} objectFit='cover' alt={'picture'}/>
                    </li>
                    <li className="intro-component-picture-item">
                        <Image src={'/static/banner/pexels-photo-298723.png'} objectFit='cover' alt={'picture'}/>
                    </li>
                </ul>
            </div>
            <div className='col-3 d-flex justify-content-center flex-column'>
                <div className='intro-component-title'>{title}</div>
                <div className='intro-component-description'>{description}</div>
            </div>
                    
                    </>
                )
            }
        </div>
    </div>
  )
}
