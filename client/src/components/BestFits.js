import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BestFits() {

    const bestFits=[];
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

    useEffect( () => {
        let data = null;
        let username = getUsername();
        axios.post('/findBestFits', {
            username: username
        })
        .then(res => data = res.data)
        .catch(error => console.error(error))
    }, [])

    return (
        <div className="bestFits">
            Your Best Fits
            <button onClick={() => {navigate('/closet')}}>Closet</button>
        </div>
    )
}

export default BestFits;