import React from "react";
import Clothing from "./Clothing";

function Outfit({ items }) {
    return (
        <label className='outfit'> 
            {items.map(clothing => {
                return (<Clothing 
                    key={clothing._id}
                    type={clothing.type}
                    label={clothing.label}
                    color={clothing.color}
                    showDelete={false}
                />)
            })} 
        </label>
    )
}

export default Outfit;