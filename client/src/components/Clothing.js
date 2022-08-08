import React from "react";
import Icon from "./Icon";
import '../stylesheets/Clothing.css';


function Clothing({ type, label, color, handleDelete, showDelete }) {


    
    const colorRGB = `rgb(${color.r},${color.g},${color.b})`;
    
    const handleClick = () => {
        const clothing = {
            type: type,
            label: label,
            color: color
        }
        handleDelete(clothing);
    }

    
    return(
        <div className="clothingItem">
           
            <Icon label={label} fill={colorRGB} />
            
            
             {showDelete? <button className="delete" onClick={handleClick}>X</button> : null }
            
        </div>
       
        
    )
}

export default Clothing
