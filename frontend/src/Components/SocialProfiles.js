import React from 'react'
import announce from '../Assests/banned.png';

const SocialProfiles = () => {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row',margin:"auto" ,color:"white",justifyContent:'space-between'}}>
                <img src={announce} alt='' style={{height:"50px",width:"50px"}} />
                <p>adityasuryawanshi21@vit.edu</p>
                <button>LogOut</button>
            </div>
        </>
    )
}

export default SocialProfiles