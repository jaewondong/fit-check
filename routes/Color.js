const axios = require("axios");

const baseUrl = "https://www.thecolorapi.com/scheme?";

class Color {


    //Gets the monochromatic colors of the item
    getMono = async (clothingItem) => {
        let color = clothingItem.color;
        let url = `${baseUrl}rgb=${color.r},${color.g},${color.b}&format=json&mode=monochrome&count=2`
        
        let data = null;
        await axios(url)
        .then(res => data = res.data)
        .catch(error => console.error(error))
        const firstMatchColor = { 
            r: data.colors[0].rgb.r,
            g: data.colors[0].rgb.g,
            b: data.colors[0].rgb.b
        }
        const secMatchColor = { 
            r: data.colors[1].rgb.r,
            g: data.colors[1].rgb.g,
            b: data.colors[1].rgb.b
        }
        const matchingColors = [firstMatchColor, secMatchColor];
        //console.log(matchingColors);
        return matchingColors;
    }

    //Gets the analogous colors of the item
    getAnalog = async (clothingItem) => {
        let color = clothingItem.color;
        let url = `${baseUrl}rgb=${color.r},${color.g},${color.b}&format=json&mode=analogic&count=2`
        
        let data = null;
        await axios(url)
        .then(res => data = res.data)
        .catch(error => console.error(error))
        const firstMatchColor = { 
            r: data.colors[0].rgb.r,
            g: data.colors[0].rgb.g,
            b: data.colors[0].rgb.b
        }
        const secMatchColor = { 
            r: data.colors[1].rgb.r,
            g: data.colors[1].rgb.g,
            b: data.colors[1].rgb.b
        }
        const matchingColors = [firstMatchColor, secMatchColor];
        return matchingColors;
    }

    //Gets the complementary colors of the item
    getComp = async (clothingItem) => {
        let color = clothingItem.color;
        let url = `${baseUrl}rgb=${color.r},${color.g},${color.b}&format=json&mode=complement&count=2`
        
        let data = null;
        await axios(url)
        .then(res => data = res.data)
        .catch(error => console.error(error))
        const firstMatchColor = { 
            r: data.colors[0].rgb.r,
            g: data.colors[0].rgb.g,
            b: data.colors[0].rgb.b
        }
        const secMatchColor = { 
            r: data.colors[1].rgb.r,
            g: data.colors[1].rgb.g,
            b: data.colors[1].rgb.b
        }
        const matchingColors = [firstMatchColor, secMatchColor];
        return matchingColors;
    }

}

module.exports = Color;