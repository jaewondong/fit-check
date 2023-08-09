import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo1.png';
import '../stylesheets/Login.css';


export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();



     /*useEffect(() => {
    fetch('/login')
    .then((response) => console.log(response));
    }, []); */

    //Saves the login info to localStorage and redirect the route to the user's closet page
    const login = (credentials) => {
        localStorage.setItem('user', credentials.username)
        navigate('/Closet')
    }

    //Resets the state
    const resetState = () => {
        setUserName('');
        setPassword('');
    }


    //Handles the submit button
    //Send the user's login info to the backend and authenticate it.
    const handleSubmit = async event => {
        event.preventDefault();
        let response = null;
        if (!username || !password) {
            return setError(true);
        }
        await axios.post('/api/login', {
            username, password
        })
        .then((res) => response = res)
        .catch((error) => console.error(error));

        resetState();
        // console.log(response);

        if (!response || !response.data) {
            setError(true);
        } else {
            setError(false);
            login(response.data);
        }
    }
     
    return (
        <div className = "login">
            <img src={logo} className="logo" alt="logo"/>
            <h2>Sign in to your closet</h2>
            <form onSubmit={handleSubmit}>
                <section className='login-form'>
                    <input type="text" className="login-input" 
                        value={username}
                        onChange={event => setUserName(event.target.value)}
                        placeholder="Username" />
                </section>
                <section className="login-form">
                    <input type="password" className="login-input"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Password" />
                </section>
                {error? <div className="error">Incorrect username or password</div>: null}
                <div className="login-btn">
                    <button type="submit" className='signin-btn'>Sign In</button> 
                </div>
                <div className='login-guest'>
                    <h3>Or explore as <a href='/guest' className="login-guest-link">Guest→</a></h3>
                </div>
            </form>
        </div>
    )
}
