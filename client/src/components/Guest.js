import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import Clothing from "./Clothing";

import '../stylesheets/Guest.css';



function Guest() {
    const [outfit, setOutfit] = useState([]);
    const [clothingType, setClothingType] = useState("");
    const [color, setColor] = useState(
        {
            r: 0,
            g: 0,
            b: 0
        }
    );
    const [value, setValue] = useState("Top");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const topOptions = [
    {label: "T-Shirts", value: "top"}, {label: "Jacket", value: "top"},
    {label: "Hoodie", value: "top"}, {label: "Shirts", value: "top"}
    ];

    const botOptions = [
        {label: "Pants", value: "bot"}, {label: "Wide Pants", value: "bot"},
        {label: "Shorts", value: "bot"}, {label: "Skirt", value: "bot"},
    ];

    const shoesOptions = [
        {label: "Sneakers", value: "shoes"}, {label: "Boots", value: "shoes"}, 
        {label: "Heels", value: "shoes"}
    ];

    const clothingOptions = [{value: "Top", options: topOptions}, {value: "Bottom", options: botOptions},
                            {value: "Shoes", options : shoesOptions}];

    //Return appropriate clothing options based on the value in the state.
    const getOptions = () => {
        return clothingOptions.filter(options => options.value === value);
    }

    //Generates a unique key for each clothing.
    const generateKey = (data, title) => {
        return `${title}${ data }_${ new Date().getTime() }`;
    }

    //Reset the state of clothingType and color when user clicks add.
    const resetState = () => {
        setClothingType("");
        setColor({
            r: 0,
            g: 0,
            b: 0
        })
    };

    //Allows user to choose the next clothing item of outfit.
    const nextSlide = () => {
        if (value === "Top") {
            setValue("Bottom");
        } else if (value === "Bottom") {
            setValue("Shoes");
        } else if (value === "Shoes") {
            setValue("Calculate");
        } else {
            setValue("Top");
        }
    }

    //Calculates Score
    const calculateScore = () => {
        localStorage.setItem('outfit', JSON.stringify(outfit));
        setOutfit([]);
        nextSlide();
        navigate('/guest/score');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (value === "Calculate") {
            return calculateScore();
        } else if (clothingType === "") {
            return setError(true);
        } 

        nextSlide();
        let type = clothingType.type;
        let lab = clothingType.label;
        let col = color;
        const clothing = {
            type: type,
            label: lab,
            color: col
        }
        setOutfit([...outfit, clothing]);
        resetState();
          
    }



    return (
        <div className="guest">
            <h1 className="guest-text">Calculate Your Fit Score</h1>
            <div className="guest-content">
                <form onSubmit={handleSubmit}>
                    <div className="add-slide">
                        <h3>Choose Your {value}</h3>
                        <Select
                            className="clothingSelectGuest"
                            placeholder='Select Your Clothing'
                            onChange={opt => setClothingType({label: opt.label, type: opt.value})}
                            options={getOptions()}
                        />
                        <h3>Pick Color</h3>
                        <SketchPicker
                            className="colorPickerGuest"
                            color={color}
                            disableAlpha={true}
                            onChangeComplete={color => setColor(color.rgb)}
                        />
                        {error? <div className="error">Please select your clothing</div>: null}
                        {value === "Calculate"?
                            <button type="submit" className="add-btnG">Calculate</button> 
                            :
                            <button type="submit" className="add-btnG">Add</button>
                        }
                    <div>
                        
                        
                    </div>
                    </div>
                    
                </form>
            
                <div className='closet-clothing-guest'> 
                    <h3>Outfit</h3>
                    {outfit.map(clothing => {
                        return (<Clothing 
                            key={generateKey(clothing, clothing.label)}
                            type={clothing.type}
                            label={clothing.label}
                            color={clothing.color}
                            showDelete={false}
                        />)
                    })} 
                </div>
            </div>
        </div>
    )

}

export default Guest;