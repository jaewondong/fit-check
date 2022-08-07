import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        await axios.post('/login', {
            username, password
        })
        .then((res) => response = res)
        .catch((error) => console.error(error));

        resetState();
        console.log(response);

        if (response == null) {
            setError(true);
        } else {
            setError(false);
            login(response.data);
        }
    }
     
    return (
        <div className = "login">
            <h1>Please log in to your closet</h1>
            <form onSubmit={handleSubmit}>
                <section className='login-form'>
                    <p>Username</p>
                    <input type="text" className="login-input" 
                        value={username}
                        onChange={event => setUserName(event.target.value)}
                        placeholder="Enter your username" />
                </section>
                <section className="login-form">
                    <p>Password</p>
                    <input type="password" className="login-input"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Enter your password" />
                </section>
                {error? <div className="error">Incorrect username or password</div>: null}
                
                <div>
                    <button type="submit">Sign In</button> 
                </div>
            </form>
        </div>
    )
}
