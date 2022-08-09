import React, { useState } from "react";
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import '../stylesheets/Add.css';




function Add({ handleAdd }) {
    
    const [clothingType, setClothingType] = useState("");
    const [color, setColor] = useState(
        {
            r: 0,
            g: 0,
            b: 0
        }
    );
    const [error, setError] = useState(false);

    const clothingOptions = [
    {label: "T-Shirts", value: "top"}, {label: "Jacket", value: "top"},
    {label: "Hoodie", value: "top"}, {label: "Shirts", value: "top"},  
    {label: "Pants", value: "bot"}, {label: "Wide Pants", value: "bot"},
    {label: "Shorts", value: "bot"}, {label: "Skirt", value: "bot"},
     {label: "Sneakers", value: "shoes"},
    {label: "Boots", value: "shoes"}, {label: "Heels", value: "shoes"}
    ];

    //Adds the clothing when the user finishes choosing the type of clothing and color.
    //Make sure the user picked the clothing type when the button is pressed.
    const handleSubmit = event => {
        event.preventDefault();
        if (clothingType === "") {
            setError(true)
        } else {
            let type = clothingType.type;
            let lab = clothingType.label;
            let col = color;
            //Hanldes the error case where the color api finds wrong color scheme
            //if the color is completely black or white (0 or 255).
            /*if (col.r + col.g + col.b === 0) {
                col = {
                    r: 3,
                    g: 3,
                    b: 3
                }
            } else if (col.r === 255 && col.g === 255 && col.b === 255) {
                col = {
                    r: 252,
                    g: 252,
                    b: 252
                }
            } */
            const clothing = {
                type: type,
                label: lab,
                color: col
            }
            handleAdd(clothing);
            resetState();
             //JSON object
        }
    }

    //Reset the state variables when user clicks submit.
    const resetState = () => {
        setClothingType("");
        setColor({
            r: 0,
            g: 0,
            b: 0
        });
        setError(false);
    };
    
    return (
        <div className="add-tab">
            <form onSubmit={handleSubmit}>
                <div>
                    <Select
                        className="clothingSelect"
                        placeholder='Select Your Type Of Clothing'
                        onChange={opt => setClothingType({label: opt.label, type: opt.value})}
                        options={clothingOptions}
                    />
                    <h3>Pick Color</h3>
                    <SketchPicker
                        className="colorPicker"
                        color={color}
                        disableAlpha={true}
                        onChangeComplete={color => setColor(color.rgb)}
                    />
                </div>
                {error? <div className="error">Please select your type of clothing</div>: null}
                <div>
                    <button type="submit" className="add-btn">Add</button>
                </div>
            </form>

        </div>

    )

}

export default Add;