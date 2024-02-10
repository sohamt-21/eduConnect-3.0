import React from 'react'
import '../CSS/AdminPanel.css'
import Icon from '../Assests/user.png'
import AdminBack from '../Assests/AdminBack'

const AdminPanel = () => {
    return (
        <>
            <div className="admin-back-div">
                <AdminBack/>
            </div>

            <div className="admin-front-div">
                <div className='adminpanelcontainer'>
                    <div className="APleftbox">
                        <h1 id='APleftboxh1'>
                            List of Groups Created
                        </h1>
                    </div>

                    <div className="APrightbox">
                        <div className="APrightboxtop">
                            <div className="content-right-box">
                                <img src={Icon} alt="icon" style={{ width: 'fit-content', margin: 'auto' }} />
                                <h2>Name of Admin</h2>
                                <h3>adminemail@sggs.edu</h3>
                            </div>
                        </div>

                        <div className="APrightboxbottom">
                            <button id='APrightboxbottombtn'>Manage Organization</button>
                            <button id='APrightboxbottombtn'>Create Groups</button>
                            <button id='APrightboxbottombtn'>Create NFT</button>
                            <button id='APrightboxbottombtn'>View NFTs</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPanel