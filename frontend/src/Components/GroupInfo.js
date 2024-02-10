import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

const GroupInfo = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/getUsers")
            .then((users) => {
                setUsers(users.data);
                console.log(users)
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="groupinfomainContainer">
            <div className='groupinfo'>
                {users.map((user) => {
                    return (<>
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    </>)
                })}
            </div>
        </div>
    );
}

export default GroupInfo

{/* <table className="table">
                    <thead>
                        <tr>
                            <th>Group ID</th>
                            <th>Group Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {

                            return (<>
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            </>)

                        })}
                    </tbody>
                </table> */}