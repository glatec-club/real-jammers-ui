import React, { useState, useEffect } from 'react'
import { authDb } from '../firebase-config'
import { getAllFeeds } from '../utils/FetchData'

import Spinner from './Spinner'
import Pin from './Pin'

const Feed = () => {

  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllFeeds(authDb).then(data => {
      setFeeds(data);
      setLoading(false);
      console.log(data);
    })
  }, [])

  if(loading) return <Spinner message="We are adding new ideas to your feed!" />

  return (
    <div>
      {feeds && feeds?.map((feed) => (
        <Pin key={feed?.id} feed={feed} className='w-max' />
      ))}
    </div>
  )
}

export default Feed