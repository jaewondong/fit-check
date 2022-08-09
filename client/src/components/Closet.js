import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Add from './Add';
import Clothing from './Clothing';
import '../stylesheets/Closet.css'

function Closet() {

    const [closet, setCloset] = useState([]);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);

    //Returns the username of the user currently logged in.
    const getUsername = () => {
        let username = localStorage.getItem('user');
        return username;
    }

    //Get the user's closet from the backend server
    const getCloset = async username => {
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
    }, [add, del] );
    
    //Handles the add button change
    const showAdd = () => {
        setAdd(!add);
        setDel(false);
    }

    //Handles the remove button change
    const showDel = () => {
        setAdd(false);
        setDel(!del);
    }

    //Called in the Add component when the user wants to add a clothing to the closet.
    const addClothing = async (clothing) => {
        showAdd();
        let username = getUsername();
        await axios.post('/addClothing', { 
            username: username,
            clothing: clothing
        })
        .catch(error => console.error(error))
    }

    //Called when the user clicks the delete button
    const delClothing = async (clothing) => {
        showDel();
        let username = getUsername();
        await axios.post('/delClothing', { 
            username: username,
            clothing: clothing
        })
        .catch(error => console.error(error))
    }
    
    
    return (
        <div className='closet'>
            <h1>{getUsername()}'s Closet</h1>
            <div className='btn'>
                {add? 
                    <div className="add-page">
                        <button onClick={showAdd} className='cancel'>Cancel</button>
                        <Add handleAdd={addClothing}/>
                    </div>
                    : 
                    <button onClick={showAdd} className='add'>+</button>
                    }
                {del?
                    <button onClick={showDel} className='cancel'>Cancel</button>
                    :
                    <button onClick={showDel} className='rem'>—</button>
                }
            </div>

            <div className='closet-clothing'> 
                {closet.map(clothing => {
                    return (<Clothing 
                        key={clothing._id}
                        type={clothing.type}
                        label={clothing.label}
                        color={clothing.color}
                        handleDelete={delClothing}
                        showDelete={del}
                    />)
                })} 
            </div>
    
        </div>
    )
}

export default Closet;

//<Link to='/closet/bestFits'>Find Your Best Fits</Link>
