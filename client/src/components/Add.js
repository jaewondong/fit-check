import React, { useState } from "react";
import Select from 'react-select';
import { SketchPicker } from 'react-color';

const clothingOptions = [
    {label: "Shirts", value: "top"},  {label: "T-Shirts", value: "top"},
    {label: "Sweatshirts", value: "top"},  {label: "Jacket", value: "top-outer"},
    {label: "Hoodie", value: "top"},  {label: "Tanks", value: "top"},
    {label: "Shorts", value: "bot"},  {label: "Pants", value: "bot"},
    {label: "Jeans", value: "bot"},  {label: "Skirts", value: "bot"},
    {label: "Dress", value: "all"}, {label: "Coat", value: "top-outer"},
    {label: "Sneakers", value: "shoes"}, {label: "Boots", value: "shoes"},
    {label: "Heals", value: "shoes"}
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
            const clothing = {
                type: type,
                label: lab,
                color: color
            }
            handleAdd(clothing);
            resetState();
             //JSON object
        }
        //console.log(clothingType);
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
                        placeholder='Select Your Clothing'
                        onChange={opt => setClothingType({label: opt.label, type: opt.value})}
                        options={clothingOptions}
                    />
                    <h3>Pick the color</h3>
                    <SketchPicker
                        color={color}
                        disableAlpha={true}
                        onChangeComplete={color => setColor(color.rgb)}
                    />
                    
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>

        </div>

    )

}

export default Add;

/*{label: '', clothingType: ''}
onChange={opt => setClothingType({label: opt.label, clothingType: opt.value})}
<Select
                    placeholder='Select Your Clothing'
                    
                    options={clothingOptions}/>
                    <SliderPicker
                    color="#ff0000"
                    onChangeComplete={color => console.log(color.rgb)}/>
 */