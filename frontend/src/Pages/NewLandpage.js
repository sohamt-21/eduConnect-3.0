import React from 'react'
import HeroSection from '../Components/HeroSection'
import Info from '../Components/Info'
import AfterSign from '../Components/AfterSign'
import Footer from '../Components/Footer'
import Timeline from '../Components/Timeline'
import TimeLineTop from '../Components/TimeLineTop'

const NewLandpage = () => {
    return (
        <div>
            <AfterSign />
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

export default NewLandpage;