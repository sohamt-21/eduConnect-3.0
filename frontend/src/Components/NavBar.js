import React from 'react'
import '../CSS/NavBar.css'
import Logo from '../Assests/logoo.png'
import { SignInButton } from '@clerk/clerk-react';

const NavBar = () => {
    return (
        <div className='navbarContainer'>
            <div className="navbarleft">
                <img src={Logo} alt="" id='navbar_logo' />
            </div>

            <div className="navbarmid">
                <li id='navbar_li'>
                    <a href="/" id='navbar_a'>Home</a>
                    <a href="/" id='navbar_a'>About</a>
                    <a href="/" id='navbar_a'>How to?</a>
                    <a href="/" id='navbar_a'>Help</a>
                </li>
            </div>

            <div className="navbarright">
                <SignInButton id='navbarbutton' />
            </div>
        </div>
    )
}

export default NavBar