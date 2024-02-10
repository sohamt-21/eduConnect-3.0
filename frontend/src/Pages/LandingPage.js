import React from 'react'
import HeroSection from '../Components/HeroSection'
import Info from '../Components/Info'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import Timeline from '../Components/Timeline'
import TimeLineTop from '../Components/TimeLineTop'

const LandingPage = () => {
    return (
        <div>
            <NavBar />
            <HeroSection />
            <Info />
            <br /><br /><br />
            <TimeLineTop/>
            <Timeline/>
            <br /><br /><br />
            <Footer />
        </div>
    )
}

export default LandingPage