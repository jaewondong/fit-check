import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo1.png';
import '../stylesheets/Login.css'


export default function SignUp() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

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
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let response = null;

        //make sure the user inputted both username and password.
        if (username && password) {
            
            axios.post('/api/signup', {
            username, password
            })
            .then((res) => response = res)
            .then(() => console.log("User Created Successfully"))
            .catch((error) => console.error(error));

            resetState();
            if (response !== null) {
                login(response.data);
                setError(false);
                setErrorMsg('');
            } else {
                setError(true);
                setErrorMsg('The username is already taken');
            }
            
        } else {
            setError(true);
            setErrorMsg('Please fill out your info');
        }
        
    }
     
    return (
        <div className = "login">
            <img src={logo} className="logo" alt="logo"/>
            <h2>Create your closet</h2>
            <form onSubmit={handleSubmit}>
                <section className='login-form'>
                    
                    <input type="text" className="login-input" 
                        value={username}
                        onChange={event => setUserName(event.target.value)}
                        placeholder="Enter your desired username" />
                </section>
                <section className='login-form'>
                    
                    <input type="password" className="login-input"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Enter your desired password" />
                </section>
                {error? <div className="error">{errorMsg}</div>: null}
                <div className="login-btn">
                    <button type="submit" className="signin-btn">Create Closet</button>
                </div>
                <div className='login-guest'>
                    <h3>Or explore as <a href='/guest' className="login-guest-link">Guest→</a></h3>
                </div>
            </form>
        </div>
    )
}
