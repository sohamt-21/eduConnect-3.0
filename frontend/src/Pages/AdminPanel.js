import React from 'react'
import '../CSS/AdminPanel.css'
import Icon from '../Assests/user.png'
import AdminBack from '../Assests/AdminBack'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes, bytes2Char } from "@taquito/utils";
import {useNavigate} from 'react-router-dom';

const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const [NFTSMinted, setNFTSMinted] = useState([]);
    const Navigator=useNavigate();


    const makereq = async () => {
        await axios
            .get("http://localhost:3001/getUsers")
            .then((users) => {
                setUsers(users.data);
                console.log(users)
            })
            .catch((err) => console.log(err));
    }

    makereq();

    const gotoCreateNFT = () => {
        window.open('http://localhost:5173/');
    }

    const GotoComm = () => {
       Navigator("/Insta")
    }


    const getUserNfts = async () => {

        const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');

        const contract = await Tezos.wallet.at('KT1HX3Zx6XTKTh7Pq1BGwLs1kyVZrMKDnh58');

        let nftStorage = [];

        nftStorage = await contract.storage();

        const getTokenIds = await nftStorage.reverse_ledger.get("tz1d2PozHapCqFvFo51bRtYbTHSCSGNs4m6v");


        let userNfts = await Promise.all([
            ...getTokenIds.map(async id => {
                const tokenId = id.toNumber();
                const metadata = await nftStorage.token_metadata.get(tokenId);
                const tokenInfoBytes = metadata.token_info.get("");
                const tokenInfo = bytes2Char(tokenInfoBytes);
                return {
                    tokenId,
                    ipfsHash:
                        tokenInfo.slice(0, 7) === "ipfs://" ? tokenInfo.slice(7) : null
                };
            })
        ]);

        console.log(userNfts);

        setNFTSMinted(userNfts);

    };


    return (
        <>
            <div className="admin-back-div">
                <AdminBack />
            </div>

            <div className="admin-front-div">
                <div className='adminpanelcontainer'>
                    <div className="APleftbox">
                        <h1 id='APleftboxh1'>NFTS Minted</h1>
                        <div className="APleftboxcontainer">
                            {NFTSMinted.map((nft) => {
                                return (<>
                                    <div style={{display:'flex' , flexDirection:'row',justifyContent:'space-around'}}>
                                        <p>TokenId:{nft.tokenId}</p>
                                        <a target='_blank' id='IPFSNFtID' style={{textDecoration:"none" , listStyle:'none',color:"whitesmoke"}}  href={`https://cloudflare-ipfs.com/ipfs/${nft.ipfsHash}`}>IPFS HASH</a>
                                    </div>
                                </>)
                            })}
                        </div>

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


                            <Link to={"/manage"}><button id='APrightboxbottombtn' style={{ width: '120%' }}>Manage Organization</button></Link>

                            <button id='APrightboxbottombtn' onClick={GotoComm}>Create Groups</button>

                            <button id='APrightboxbottombtn' onClick={gotoCreateNFT}>Create NFT</button>

                            <button id='APrightboxbottombtn' onClick={getUserNfts}>View Nfts</button>

                            {/* <Link to={"/manage"}><button id='APrightboxbottombtn'>Manage Organization</button></Link>

                            <Link to={"/Insta"}><button id='APrightboxbottombtn'>Create Groups</button></Link>

                            <a href='http://localhost:5173/'><button id='APrightboxbottombtn'>Create NFT</button></a>

                            <button id='APrightboxbottombtn' onClick={getUserNfts}>View NFTs</button> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPanel