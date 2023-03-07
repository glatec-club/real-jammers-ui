import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoHome, IoPlay, IoPause } from 'react-icons/io5'
import { MdOutlineReplay10, MdForward10, MdVolumeUp, MdVolumeOff, MdFullscreen } from 'react-icons/md'
import Spinner from './Spinner';
import { getSpecificVideo } from '../utils/FetchData';
import Slider from './slider/Slider'
import VolumeSlider from './volumeSlider/VolumeSlider';
import ReactPlayer from 'react-player'

import Logo from '../assets/logo2.png';

const PinDetail = () => {

  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if(videoId){
      setIsLoading(true);
      getSpecificVideo(videoId).then((data) => {
        setVideoInfo(data);
        console.log(data);
        setIsLoading(false);
      })
    }
  }, [videoId])
  
  if (isLoading) return <Spinner />;

  return (
    <div className='flex w-full h-auto justify-center items-center flex-col py-2 px-4'>
      <div className='flex items-center w-full my-4'>
        <Link to='/dashboard'>
          <IoHome fontSize={25} />
        </Link>
        <div className='w-[1px] h-[25px] bg-gray-500 mx-2'></div>
        <p className='text-semibold w-full'>
          {videoInfo?.title}
        </p>
      </div>
      <div className='grid grid-cols-3 gap-2 w-full'>
        <div className='w-full col-span-2'>
          <div className='flex w-full bg-black relative'>
            <ReactPlayer
              url={videoInfo?.videoUrl}
              className='flex items-center justify-center'
              width='100%'
              height='100%'
              playing={isPlaying}
              muted={muted}
            />

            {/* Video player controls */}
            <div className='flex absolute top-0 left-0 right-0 bottom-0 flex-col justify-between items-center z-[1] cursor-pointer'>
              {/* Play icon */}
              <div className='flex items-center justify-center w-full h-full'
                onClick={() => {setIsPlaying(!isPlaying)}}>
                  {!isPlaying && (
                    <IoPlay fontSize={60} color='#f2f2f2' cursor={'pointer'} />
                  )}
              </div>
              {/* Progress Controls */}
              <div className='flex w-full items-center flex-col bg-gradient-to-t from-slate-900 via-slate-500 to-slate-50'>
                <Slider />
                {/* Other Player Controls */}
                <div className='flex w-full items-center my-2 gap-10 mx-2'>
                  <MdOutlineReplay10 fontSize={30} color="#f1f1f1" cursor={'pointer'} />
                  <div onClick={() => setIsPlaying(!isPlaying)}>
                    {!isPlaying ? (
                      <IoPlay fontSize={30} color="#f2f2f2" cursor={'pointer'} />
                    ) : (
                      <IoPause fontSize={30} color="#f2f2f2" cursor={'pointer'} />
                    )}
                  </div>
                  <MdForward10 fontSize={30} color="#f2f2f2" cursor={'pointer'} />
                  {/* Volume Controls */}
                  <div className='flex items-center'>
                    <div onClick={() => setMuted(!muted)}>
                      {!muted ? (
                        <MdVolumeUp fontSize={30} color="#f2f2f2" cursor={'pointer'} />
                      ) : (
                        <MdVolumeOff fontSize={30} color="#f2f2f2" cursor={'pointer'} />
                      )}
                    </div>
                    <VolumeSlider />
                    {/* Duration of video */}
                    <div className='flex items-center'>
                      <p className=' text-base text-gray-300'>00:00</p>
                      <p className=' text-base text-gray-300'>/</p>
                      <p className=' text-base text-gray-300'>00:00</p>
                    </div>

                    <img src={Logo} alt="logo" width={'80px'} className='ml-auto' />
                    <MdFullscreen fontSize={60} color={'f1f1f1'} cursor={'pointer'} onClick={() => {}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full col-span-1'></div>
      </div>
    </div>
  )
}

export default PinDetail