import React from "react";
//Import all the svg files for clothing items
import { TShirt, Jacket, Hoodie, Shirts, Pants, WidePants, Shorts, Skirt, Dress, Sneakers, Boots, Heels } from "./clothingIcons";

const Icon = ({label, fill}) => {

    if (label === "T-Shirts") {
        return (
            <TShirt fill={fill} />
        );
    } else if (label === "Jacket") {
        return (
            <Jacket fill={fill} />
        )
    } else if (label === "Hoodie") {
        return (
            <Hoodie fill={fill} />
        )
    } else if (label === "Shirts") {
        return (
            <Shirts fill={fill} />
        )
    } else if (label === "Pants") {
        return (
            <Pants fill={fill} />
        )
    } else if (label === "Wide Pants") {
        return (
            <WidePants fill={fill} />
        )
    } else if (label === "Shorts") {
        return (
            <Shorts fill={fill} />
        )
    } else if (label === "Skirt") {
        return (
            <Skirt fill={fill} />
        )
    } else if (label === "Dress") {
        return (
            <Dress fill={fill} />
        )
    }  else if (label === "Sneakers") {
        return (
            <Sneakers fill={fill} />
        )
    } else if (label === "Boots") {
        return (
            <Boots fill={fill} />
        )
    } else if (label === "Heels") {
        return (
            <Heels fill={fill} />
        )
    } else {
        return (
            <div>
                The Clothing Does Not Exist
            </div>
        )
    }
 
    
}

export default Icon;