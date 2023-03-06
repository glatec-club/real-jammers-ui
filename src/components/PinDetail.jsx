import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoHome, IoPlay } from 'react-icons/io5'
import Spinner from './Spinner';
import { getSpecificVideo } from '../utils/FetchData';

import { authDb } from '../firebase-config'
//import ReactPlayer from 'react-player';

const PinDetail = () => {

  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(videoId){
      setIsLoading(true);
      getSpecificVideo(videoId).then((data) => {
        setVideoInfo(data);
        //console.log(data);
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
            <video
              url={videoInfo?.videoUrl}
              width={'100%'}
              height={'100%'}
              controls
            />
            {/* Video player controls */}
            <div className='flex absolute top-0 left-0 right-0 bottom-0 flex-col justify-between items-center z-[1] cursor-pointer'>
              {/* Play icon */}
              <div className='flex items-center justify-center w-full h-full'
                onClick={() => {}}>
                  {!isPlaying && (
                    <IoPlay fontSize={60} color='#f2f2f2' cursor={'pointer'} />
                  )}
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