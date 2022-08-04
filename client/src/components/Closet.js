import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Add from './Add';
import Clothing from './Clothing';

function Closet() {

    const [closet, setCloset] = useState([]);
    const [add, setAdd] = useState(false);
    
    const navigate = useNavigate();

    //Returns the username of the user currently logged in.
    const getUsername = () => {
        let username = localStorage.getItem('user');
        
        return username;
    }

    //Get the user's closet from the backend server
    const getCloset = async username => {
        console.log("username:" + username);
        let data = null;
        await axios.post('/closet', { 
                username: username
             })
        .then(res => data = res.data)
        .catch(error => console.error(error))
        return data;
    }

    //Updates the closet everytime the user enters the website or add an item
    useEffect( () => {
        const username = getUsername();
        const getData = async () => {
            const data = await getCloset(username);
            setCloset(data);
        };
        getData()
        .catch(error => console.error(error));
    }, [add] );
    
    //Handles the add button change
    const showAdd = () => {
        setAdd(!add);
    }

    //Called in the Add component when the user wants to add a clothing to the closet.
    const addClothing = async (clothing) => {
        showAdd();
        let username = getUsername();
        let data = null;
        await axios.post('/addClothing', { 
            username: username,
            clothing: clothing
        })
        .then(res => data = res.data)
        .catch(error => console.error(error))
    }
    
    //Log out the user and rediret to the home page.
    const logout = () => {
        localStorage.removeItem('user');
        navigate('/', {replace : true});
    }
    
    return (
        <div className='closet'>
            <h1>This is your closet.</h1>
            <div> 
                {closet.map(clothing => {
                    return (<Clothing 
                        key={clothing._id}
                        type={clothing.type}
                        label={clothing.label}
                        color={clothing.color}
                    />)
                })} 
            </div>
            
            {add? <div>
                <Add handleAdd={addClothing}/>
                <button onClick={showAdd} className='btn'>Cancel</button>
                </div>
             : <button onClick={showAdd} className='btn'>Add</button>}
            <button onClick={logout} className="btn">Log Out</button>
        </div>
    )
}

export default Closet;

/* */