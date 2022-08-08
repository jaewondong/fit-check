import React from "react";
import Clothing from "./Clothing";

function Outfit({ items }) {
    return (
        <div className='outfit'> 
            {items.map(clothing => {
                return (<Clothing 
                    key={clothing._id}
                    type={clothing.type}
                    label={clothing.label}
                    color={clothing.color}
                    showDelete={false}
                />)
            })} 
        </div>
    )
}

export default Outfit;