import React, { useState, useEffect, useRef } from 'react'
import './volumeSlider.css'
import './volumeThumb.css'

const VolumeSlider = ({ percentage = 0, onChange }) => {

    const [position, setPosition] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0)
  const [progressBarWidth, setProgressBarWidth] = useState(0)

  const rangeRef = useRef()
  const thumbRef = useRef()

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width
    const thumbWidth = thumbRef.current.getBoundingClientRect().width
    const centerThumb = (thumbWidth / 100) * percentage * -1
    const centerProgressBar =
      thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage
    setPosition(percentage)
    setMarginLeft(centerThumb)
    setProgressBarWidth(centerProgressBar)
  }, [percentage])


  return (
    <div className='volume-slider-container'>
      <div
        className='volume-progress-bar-cover'
        style={{
          width: `${progressBarWidth}px`
        }}
      ></div>
      <div
        className='volume-thumb'
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`
        }}
      ></div>
      <input
        type='range'
        value={position}
        ref={rangeRef}
        step='0.01'
        className='volume-range'
        onChange={onChange}
      />
    </div>
  )
}

export default VolumeSlider