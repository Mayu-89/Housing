
import React, { useState } from 'react';
import '../styles/sign.css';
import { Button } from '@mui/material';


function SignIn({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Handle the form submission
    const handleSubmit = (e) => { 
        e.preventDefault();
         onLogin(username, password, setUsername, setPassword); // Trigger the onLogin function passed as a prop 
         };
  

    // When authentication fails, reset the fields and show failure message
   
    return (
        <div className='login'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className='logininfo'>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='logininfo'>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    className="signin-button"
                >
                    Sign In
                </Button>
            </form>
            {isAuthenticated && <p>Welcome, you are logged in!</p>}
        </div>
    );
}

export default SignIn;
