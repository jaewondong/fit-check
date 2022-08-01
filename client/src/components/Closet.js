import React from 'react';
import { useNavigate } from 'react-router-dom'

function Closet() {
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/', {replace : true});
    }

    return (
        <div>
            <h1>This is your closet.</h1>
            <button onClick={() => logout()}>Log Out</button>
        </div>
    )
}

export default Closet;
