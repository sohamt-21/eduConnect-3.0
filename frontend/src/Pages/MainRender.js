import React from 'react'
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import LandingPage from './LandingPage';
import NewLandpage from './NewLandpage';


const MainRender = () => {
    return (
        <>
            <SignedOut>
                <LandingPage />
            </SignedOut>

            <SignedIn>
                <NewLandpage />
            </SignedIn>
        </>
    )
}

export default MainRender