import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


/*
async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
} */

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

    //Shows error message when the user enters wrong username or password.
    const showErrorMsg = (message) => {
        setError(true);
        setTimeout(setError(false), 3000);
    }

    //Handles the submit button
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

        if (response.data) {
            login(response.data)
        } else {
            showErrorMsg("Invalid Password");
        }
        
        
    }

     
    return (
        <div className = "login-page">
            <h1>Please log in to your closet</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" className="login-form" 
                        value={username}
                        onChange={event => setUserName(event.target.value)}
                        placeholder="Enter your username" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" className="login-form"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        placeholder="Enter your password" />
                </label>
                
                <div>
                    <button type="submit">Log In</button> 
                </div>
            </form>
        </div>
    )
}
