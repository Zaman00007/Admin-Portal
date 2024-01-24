import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Home.css';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async () => {
    try {
      const response = await fetch('http://localhost:8800/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if(!data.isAdmin){
          return console.error('You are not Admin');
        } 
        
        console.log('Login successful', data);

        
        Cookies.set('token', data.token, { expires: 7 });

    
        history.push('/admin');
      } else {
        console.error('Login failed', data);
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div>
      <div className="auth-section">
        <h2 className="font">Admin Login</h2>
        <div className="content">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="bar"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bar"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login} className="submit-button">
            Login
          </button>
        </div>
      </div>
      <div className="Logo">
        <div className="logo">
          <h2 className="logo-font">Logo</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
