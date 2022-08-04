import React from "react";
import axios from "axios";

function Clothing({ type, label, color}) {
    
    return(
        <div>
           <label>
                type: {type}, label: {label}, color: {JSON.stringify(color)}
            </label>
        </div>
        
    )
}

export default Clothing

//