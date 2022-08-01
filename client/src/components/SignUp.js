import React, { useState } from 'react';
import axios from 'axios';


export default function SignUp() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const resetState = () => {
        setUserName('');
        setPassword('');
    }
    
    const handleSubmit = async event => {
        event.preventDefault();

        axios.post('/signup', {
            username, password
        })
        .then(() => resetState())
        .then(() => console.log("User Created Successfully"))
        .catch((error) => console.error(error));
    }
     
    return (
        <div className = "signup-page">
            <h1>Create your closet account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" className="signup-form" 
                        onChange={event => setUserName(event.target.value)}
                        placeholder="Enter your desired username" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" className="signup-form"
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Enter your desired password" />
                </label>
                <div>
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}
