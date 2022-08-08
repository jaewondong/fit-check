import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './ProtectedRoute';


export default function Home() {
    let navigate = useNavigate();
    const loggedIn = useAuth();


    //Checks if the user has already logged in when the user enters the website
    //If true, direct the user to their closet.
    useEffect(() => {
        
        if (loggedIn) {
            navigate('/closet');
        }
     });
    
    
    return (
        <div className='home'>  
            <h1>Welcome to Fit Check!</h1>
            <div className='about-content'>
                <p>About Fit Check</p>
            </div>
        </div>
    );
}

/*<button onClick={() => {
                navigate("/signup");
            }}>Sign Up</button> */

