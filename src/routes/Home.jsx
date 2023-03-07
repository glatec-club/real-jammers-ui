import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Brand from '../components/Brand'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Brand />
        <AboutUs />
        <Footer />
    </div>
  )
}

export default Home