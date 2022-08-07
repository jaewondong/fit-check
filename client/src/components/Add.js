import React, { useState } from "react";
import Select from 'react-select';
import { SketchPicker } from 'react-color';

const clothingOptions = [
    {label: "T-Shirts", value: "top"}, {label: "Jacket", value: "top"},
    {label: "Hoodie", value: "top"}, {label: "Shirts", value: "top"},  
    {label: "Pants", value: "bot"}, {label: "Wide Pants", value: "bot"},
    {label: "Shorts", value: "bot"}, {label: "Skirt", value: "bot"},
     {label: "Sneakers", value: "shoes"},
    {label: "Boots", value: "shoes"}, {label: "Heels", value: "shoes"}
];


function Add({ handleAdd }) {
    
    const [clothingType, setClothingType] = useState();
    const [color, setColor] = useState(
        {
            r: 0,
            g: 0,
            b: 0
        }
    );

    //Adds the clothing when the user finishes choosing the type of clothing and color.
    //Make sure the user picked the clothing type when the button is pressed.
    const handleSubmit = event => {
        event.preventDefault();
        if (clothingType == null) {
            console.log("please choose the clothing type")
        } else {
            let type = clothingType.type;
            let lab = clothingType.label;
            let col = color;
            //Hanldes the error case where the color api finds wrong color scheme
            //if the color is completely black or white (0 or 255).
            if (col.r + col.g + col.b == 0) {
                col = {
                    r: 1,
                    g: 1,
                    b: 1
                }
            } else if (col.r == 255 && col.g == 255 && col.b == 255) {
                col = {
                    r: 254,
                    g: 254,
                    b: 254
                }
            }
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

    //Reset the state variables when the user clicks submit.
    const resetState = () => {
        setClothingType(null);
        setColor({
            r: 0,
            g: 0,
            b: 0
        })
    };
    
    return (
        <div className="add">
            <form onSubmit={handleSubmit}>
                <div>
                    <Select
                        className="clothingSelect"
                        placeholder='Select Your Clothing'
                        onChange={opt => setClothingType({label: opt.label, type: opt.value})}
                        options={clothingOptions}
                    />
                    <h3>Pick the color</h3>
                    <SketchPicker
                        className="colorPicker"
                        color={color}
                        disableAlpha={true}
                        onChangeComplete={color => setColor(color.rgb)}
                    />
                    
                </div>
                <div>
                    <button type="submit" className="btn">Add</button>
                </div>
            </form>

        </div>

    )

}

export default Add;