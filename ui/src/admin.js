import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './admin.css';

function Admin() {
    const [userList, setUserList] = useState([]);
    const history = useHistory();

    const viewAll = async () => {
        try {
            const token = Cookies.get('token');
            
            const response = await fetch('http://localhost:8800/admin', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User list fetched successfully', data);
                setUserList(data);
            } else {
                console.error('Error fetching users', data);
            }
        } catch (error) {
            console.error('Error during fetch users', error);
        }
    };

    const Users = async () => {
        history.push('/Users');
    };

    
    useEffect( () => {
        viewAll();
    }, []);

    const create = async () => {
        console.log("create");
        try {
            const token = Cookies.get('token');
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const response = await fetch('http://localhost:8800/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User created successfully', data);
                viewAll();
            } else {
                console.error('Error creating user', data);
            }
        } catch (error) {
            console.error('Error during create user', error);
        }
    };

    return (
        <div>
            <div className="dashboard">
                <div className="create_user">
                    <h2 className="font">Create User</h2>
                    <div className="content">
                        <input type="text" id="username" placeholder="Username" className="bar" />
                        <input type="password" id="password" placeholder="Password" className="bar" />
                        <button type="button" onClick={create} className="submit-button">Submit</button>
                    </div>
                </div>
                <div className="view_user">
                    <h2 className="font">View User</h2>
                    <button type="button" className="submit-button">View Users</button>
                    <ul className="List" id="userList">
                        {/* Display fetched users */}
                        {userList.slice(-2).map(user => (
                            <li key={user._id}>{user.username}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Admin;
