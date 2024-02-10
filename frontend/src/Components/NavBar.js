import React from 'react'
import '../CSS/NavBar.css'
import Logo from '../Assests/logoo.png'

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
                <button id='navbarbutton'>Sign In</button>
                <button id='navbarbutton'>Sign Up</button>
            </div>
        </div>
    )
}

export default NavBar