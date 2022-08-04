import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const resetState = () => {
        setUserName('');
        setPassword('');
    }

    //Saves the login info to localStorage and redirect the route to the user's closet page
    const login = (credentials) => {
        localStorage.setItem('user', credentials.username)
        navigate('/Closet')
    }
    
    const handleSubmit = async event => {
        event.preventDefault();
        let response = null;

        //make sure the user inputted both username and password.
        if (username && password) {
            
            await axios.post('/signup', {
            username, password
            })
            .then((res) => response = res)
            .then(() => console.log("User Created Successfully"))
            .catch((error) => console.error(error));

            resetState();
            console.log(response);
            if (response !== null) {
                login(response.data);
            } else {
                console.log("The username is already taken.");
            }
            
        } else {
            console.log("Please fill out all your info.")
        }
        
    }
     
    return (
        <div className = "signup">
            <h1>Create your closet account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" className="signup-form" 
                        value={username}
                        onChange={event => setUserName(event.target.value)}
                        placeholder="Enter your desired username" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" className="signup-form"
                        value={password}
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
