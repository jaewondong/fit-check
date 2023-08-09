const axios = require("axios");

const baseUrl = "https://www.thecolorapi.com/scheme?";

class Color {


    //Gets the monochromatic colors of the item
    getMono = async (clothingItem) => {
        const color = clothingItem.color;
        const url = `${baseUrl}rgb=${color.r},${color.g},${color.b}&format=json&mode=monochrome&count=2`
        
        const res = await axios(url)
        const colors_data = res.data;
        const firstMatchColor = { 
            r: colors_data.colors[0].rgb.r,
            g: colors_data.colors[0].rgb.g,
            b: colors_data.colors[0].rgb.b
        }
        const secMatchColor = { 
            r: colors_data.colors[1].rgb.r,
            g: colors_data.colors[1].rgb.g,
            b: colors_data.colors[1].rgb.b
        }
        const matchingColors = [firstMatchColor, secMatchColor];
        //console.log(matchingColors);
        return matchingColors;
    }

    //Gets the analogous colors of the item
    getAnalog = async (clothingItem) => {
        const color = clothingItem.color;
        const url = `${baseUrl}rgb=${color.r},${color.g},${color.b}&format=json&mode=analogic&count=2`
        
        const res = await axios(url)
        const colors_data = res.data;
        const firstMatchColor = { 
            r: colors_data.colors[0].rgb.r,
            g: colors_data.colors[0].rgb.g,
            b: colors_data.colors[0].rgb.b
        }
        const secMatchColor = { 
            r: colors_data.colors[1].rgb.r,
            g: colors_data.colors[1].rgb.g,
            b: colors_data.colors[1].rgb.b
        }
        const matchingColors = [firstMatchColor, secMatchColor];
        //console.log(matchingColors);
        return matchingColors;
    }

    //Gets the complementary colors of the item
    getComp = async (clothingItem) => {
        let color = clothingItem.color;
        let url = `${baseUrl}rgb=${color.r},${color.g},${color.b}&format=json&mode=complement&count=2`
        
        const res = await axios(url)
        const colors_data = res.data;
        let firstMatchColor = null;
        let secMatchColor = null;
        //Error handling in the color api: if rgb values are similar (black or white), it returns same colors, not complementary colors.
        if (Math.abs(color.r - color.g) < 10 && Math.abs(color.r - color.b) < 10 && Math.abs(color.g - color.b) < 10) {
            firstMatchColor = { 
                r: 255-colors_data.colors[0].rgb.r,
                g: 255-colors_data.colors[0].rgb.g,
                b: 255-colors_data.colors[0].rgb.b
            }
            secMatchColor = { 
                r: 255-colors_data.colors[1].rgb.r,
                g: 255-colors_data.colors[1].rgb.g,
                b: 255-colors_data.colors[1].rgb.b
            }
        } else {
            firstMatchColor = { 
                r: colors_data.colors[0].rgb.r,
                g: colors_data.colors[0].rgb.g,
                b: colors_data.colors[0].rgb.b
            }
            secMatchColor = { 
                r: colors_data.colors[1].rgb.r,
                g: colors_data.colors[1].rgb.g,
                b: colors_data.colors[1].rgb.b
            }
        }
        const matchingColors = [firstMatchColor, secMatchColor];
        return matchingColors;
    }

}

module.exports = Color;