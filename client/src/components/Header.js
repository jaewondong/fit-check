import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo1.png';
import '../stylesheets/Header.css';

function Header({ log }) {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect( () => {
        const checkLoggedIn = () => {
            const user = localStorage.getItem('user');
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }
       checkLoggedIn();
    }, [localStorage.getItem('user')]);

    //Log out the user and rediret to the home page.
    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem('user');
        navigate('/', {replace : true});
    }
    
    return (
        <header>
            <Link to="/">
                <img src={logo} className="logo" alt="logo"/>
            </Link>
            <nav className="navbar" role="navigation">
                <ul className="nav__items">
                    <li className="nav_item">
                        <a href="/" className="nav__link">About</a>
                    </li>
                    <li className="nav_item">
                        <a href="/closet" className="nav__link">My Closet</a>
                    </li>
                    <li className="nav_item">
                        <a href="/closet/bestFits" className="nav_link">My Top Fits</a>
                    </li>
                    <li className="nav_item">
                        <a href="/guest" className="nav__link">Guest</a>
                    </li>
                </ul>
            </nav>
            
            {loggedIn? 
                <div className='auth-btns'>
                    <a href='/'><button className='signin-btn' onClick={logout}>Sign Out</button></a>
                </div> :
                <div className='auth-btns'>
                    <a href="/login"><button className='signin-btn'>Sign In</button></a>
                    <a href="/signup"><button className='signup-btn'>Sign Up</button></a>
                </div>
            }
            
        </header>
    )

}

export default Header;