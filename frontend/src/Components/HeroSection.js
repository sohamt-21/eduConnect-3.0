import React from 'react'
import SplineBot from '../Assests/Spline_Bot'
import { TypeAnimation } from 'react-type-animation'
import '../CSS/Hero.css'
import NavBar from './NavBar'
// import ScrollAnimation from 'react-animate-on-scroll'

const HeroSection = () => {

    return (
        <div className='herocontainer'>
            <div className="heroback">
                <SplineBot />
            </div>
            <div className="herofront">
                <TypeAnimation
                    style={{ whiteSpace: 'pre-line', height: '30px', display: 'block' }}
                    sequence={[
                        'Welcome to Our\n Social Network \nApp\n Here we connect\n make post \nmeet n greet \nand create doubts',
                    ]}
                    cursor={false}
                />

                
            </div>
        </div>
    )
}

export default HeroSection