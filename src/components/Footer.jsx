import React, { useState } from 'react'
import AOS from 'aos'
import { FaArrowUp } from 'react-icons/fa'
import { Link } from 'react-scroll'

import './FooterStyles.css'

AOS.init();
const Footer = () => {

    // Visibile useState
    const [visible, setVisible] = useState(false);
    const makeVisible = () => {
        if(window.scrollY >= 100){
            setVisible(true);
        }else{
            setVisible(false);
        }
    };

    window.addEventListener('scroll', makeVisible);

  return (
    <div className='w-full'>
        <div className='max-w-[2240px] text-center px-5 py-7 md:flex md:justify-between bg-[#f7ac22f5]'>
            <h2 className='font-bold'>&copy; 2023 Copyright <span className='text-indigo-700'>Real Jammers</span>. All Rights Reserved</h2>
            <h4 className='font-bold'>Designed by
                <a href="https://www.google.com" className='text-indigo-700'> GLATEC</a>
            </h4>
        </div>
        <div className={
            visible
            ? 'back-to-top active flex items-center justify-center'
            : 'back-to-top flex items-center justify-center'
        } data-aos='fade-right' data-aos-duration='1500'>
            <Link to='home' smooth={true} offset={0} duration={1500} onClick={makeVisible}>
                <FaArrowUp />
            </Link>
        </div>
    </div>
  )
}

export default Footer