import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Outfit from "./Outfit";

function BestFits() {

    const [monoFits, setMonoFits] = useState([]);
    const [analogFits, setAnalogFits] = useState([]);
    const [compFits, setCompFits] = useState([]);

    const navigate = useNavigate();

    //Generates a unique key for each outfit.
    const generateKey = (data, title) => {
        return `${title}${ data }_${ new Date().getTime() }`;
    }

    //Returns the username of the user currently logged in.
    const getUsername = () => {
        let username = localStorage.getItem('user');
        return username;
    }

    //Gets the user's closet from the backend server
    const getBestFits = async username => {
        
        let data = null;
        await axios.post('/findBestFits', {
            username: username
        })
        .then(res => data=res.data)
        .catch(error => console.error(error))
        return data;
    }

    //Builds the best fits from the user's closet
    useEffect( () => {
       
        const username = getUsername();
        const getData = async () => {
            const data = await getBestFits(username);
            setMonoFits(data.bestMonos);
            setAnalogFits(data.bestAnalogs);
            setCompFits(data.bestComps);
        };
        getData()
        .catch(error => console.error(error));
        
    }, [])

    return (
        <div className="bestFits">
            <h1>Your Best Outfits</h1>
            <section className="outfits">
                <div className="monochrome">
                    <h3>Monochrome Outfits</h3>
                    {monoFits.map(outfit => {
                        return (<Outfit
                            items={outfit}
                            key={generateKey(outfit, "mono")}
                            />
                        )
                    })}
                </div>
                <div className="analogous">
                    <h3>Analogous Outfits</h3>
                    {analogFits.map(outfit => {
                        return (<Outfit
                            items={outfit}
                            key={generateKey(outfit, "analog")}
                            />
                        )
                    })}
                </div>
                <div className="complementary">
                    <h3>Complementary Outfits</h3>
                    {compFits.map(outfit => {
                        return (<Outfit
                            items={outfit}
                            key={generateKey(outfit, "comp")}
                            />
                        )
                    })}
                </div>
            </section>
            
            <button onClick={() => {navigate('/closet')}}>Closet</button>
        </div>
    )
}

export default BestFits;