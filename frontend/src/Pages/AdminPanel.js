import React from 'react'
import '../CSS/AdminPanel.css'
import Icon from '../Assests/user.png'
import AdminBack from '../Assests/AdminBack'
import { Link } from 'react-router-dom'

const AdminPanel = () => {

    return (
        <>
            <div className="admin-back-div" style={{ width: "100%" }}>
                <AdminBack />
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
                                <img src={""} alt="icon" style={{ width: 'fit-content', margin: 'auto' }} />
                                <h2>NotJustAdmin</h2>
                                <h3>adityavanshi5451@gmail.com</h3>
                            </div>
                        </div>

                        <div className="APrightboxbottom">
                            <Link to={"/manage"}><button id='APrightboxbottombtn'>Manage Organization</button></Link>
                            <button id='APrightboxbottombtn'>Create Groups</button>
                            <a href='http://localhost:5173/'><button id='APrightboxbottombtn'>Create NFT</button></a>
                            <button id='APrightboxbottombtn'>View NFTs</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPanel