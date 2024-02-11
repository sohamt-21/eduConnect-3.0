import React, { useEffect } from 'react'
import '../CSS/NavBar.css'
import { SignOutButton, useUser } from '@clerk/clerk-react';
import Logo from '../Assests/logoo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const AfterSign = () => {

    const { user } = useUser();

    const [Admin, setAdmin] = useState(false)

    const [VITUser, setVITUser] = useState(false);


    const detectAdmin = () => {
        const EmailAddress = user.primaryEmailAddress;

        const stringedEmailAddress = EmailAddress.toString();

        if (stringedEmailAddress === "adityavanshi5451@gmail.com") {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }

    const detectVITPerson=()=>{

        const EmailAddress = user.primaryEmailAddress;

        const stringedEmailAddress = EmailAddress.toString();

        var regex = /@vit\.edu$/;

        if (regex.test(stringedEmailAddress)) {
             setVITUser(true);
        } else {
            setVITUser(false);
        }
    

    }

    useEffect(() => {
        detectAdmin()
        detectVITPerson()
    })

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
                <p>{user.fullName}</p>
                {Admin ? <Link to={"/admin"}>Go to Profile</Link> : <>
                    <Link to={"/profile"}>Go to Profile</Link>
                    <br />
                    <Link to={"/manage"}>Join Organization</Link>
                </>}
                <br />
                {VITUser ? <Link to={"/studsign"}>Join Communities</Link> :<></>}
                <SignOutButton id='navbarbutton' />
            </div>
        </div>
    )
}

export default AfterSign