import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../assets/logo2.png'

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

  return (
    <div className='h-screen w-full bg-cover bg-center bg-fixed bg-[url("https://images.pexels.com/photos/34221/violin-musical-instrument-music-sound.jpg?cs=srgb&dl=pexels-pixabay-34221.jpg&fm=jpg")]'>
      <div className='bg-black/80 w-full h-screen px-8 py-3'>
        <Link to='/'> <img className='w-[240px]' src={Logo} alt="logo" />
        </Link>
        {/* Input */}

        <div className='flex flex-col h-[80vh] justify-center items-center space-y-5'>
            <center>
                <h2 className='text-white text-3xl font-bold'>Reset Password</h2>
            </center>
            <p className='text-white'>Enter your email address to reset your password</p>
            <center>
                <input onChange={(e) => setEmail(e.target.value)} className='w-72 sm:w-96 p-2 px-3 bg-[#bababa] placeholder:text-[#efefef] border-white outline-none rounded-lg text-black' type="email" id='email' placeholder='Email address' required />
            </center>
            <center>
                <input className='w-72 sm:w-96 p-2 px-3 bg-[#df9d39] border border-white outline-none rounded-lg text-black font-semibold hover:bg-[#f1ac3c] hover:text-white duration-300' type="submit" value="SEND" />
            </center>
          </div>

          <span className='flex justify-center -mt-4 text-white text-center'>&copy; 2023 Real Jammers. All Rights Reserved</span>
      </div>
    </div>
  )
}

export default ForgotPassword