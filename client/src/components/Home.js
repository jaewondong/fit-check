import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let navigate = useNavigate();
    return (
        <div className='home'>
            <h1>Fit Check</h1>
            <button onClick={() => {
                navigate("/signup");
            }}>Sign Up</button>
            <button onClick={() => {
                navigate("/login");
            }}>Log In</button>
        </div>
    );
}