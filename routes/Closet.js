/** Class to connect to the user's closet in the mongoDB database */

const USER = require('../model/User');

const Color = require('./Color')

class Closet {

    //Returns the user's data (username, hased password, and closet) from mongoDB.
    getClosetData = async (username) => {
        return USER.findOne({username: username});
    }

    //Adds a clothing item to the user's closet in mongoDB and returns the previous closet.
    addClothingData = async (username, clothingData) => {
        const res = await USER.findOneAndUpdate({
            username: username
        }, {
            $push: { closet: clothingData }
        })
        return res.closet;

        
    }

    //Deletes a clothing item from the user's closet in mongoDB and returns the previous closet.
    delClothingData = async (username, clothingData) => {
        const res = await USER.findOneAndUpdate({
            username: username
        }, {
            $pull: { closet: clothingData }
        })
        return res.closet;
    }

    //Return the clothing item that corresponds to id in the user's closet.
    findClothing = async (username, id) => {
        const res = await this.getClosetData(username);
        const closet = res.data.closet;
        const clothing = closet.find(item => id.equals(item._id));
        
        return clothing;
    }

    //Return the Top 3 Outfits from each scheme: monochromatic, analogous, and complementary.
    findBestFits = async (closetData) => {
        const topsList = closetData.filter(clothing => clothing.type === "top");
        const botsList = closetData.filter(clothing => clothing.type === "bot");
        const shoesList = closetData.filter(clothing => clothing.type === "shoes");
        

       if (topsList.length && botsList.length && shoesList.length) {
            // find the scores using topslist, botsList, shoesList
            //find the shortest list
            const shortest = this.findShortest(topsList.length, botsList.length, shoesList.length);
            let result = {
                bestMonos: [],
                bestAnalogs: [],
                bestComps: []
            };
            let bestMonos = [];
            let bestAnalogs = [];
            let bestComps = [];
            if (shortest === "top") {
                bestMonos = await this.findBestMonos(topsList, botsList, shoesList);
                bestAnalogs = await this.findBestAnalogs(topsList, botsList, shoesList);
                bestComps = await this.findBestComps(topsList, botsList, shoesList);
            } else if (shortest === "bottom") {
                bestMonos = await this.findBestMonos(botsList, topsList, shoesList);
                bestAnalogs = await this.findBestAnalogs(botsList, topsList, shoesList);
                bestComps = await this.findBestComps(botsList, topsList, shoesList);
            } else {
                bestMonos = await this.findBestMonos(shoesList, topsList, botsList);
                bestAnalogs = await this.findBestAnalogs(shoesList, topsList, botsList);
                bestComps = await this.findBestComps(shoesList, topsList, botsList);
            }
            // console.log(bestMonos, bestAnalogs, bestComps)
            let bestMonosFits = bestMonos.map(comb => comb.clothings);
            let bestAnalogsFits = bestAnalogs.map(comb => comb.clothings);
            let bestCompsFits = bestComps.map(comb => comb.clothings);
            result = {
                bestMonos: bestMonosFits,
                bestAnalogs: bestAnalogsFits,
                bestComps: bestCompsFits
            };
            
            return result;
       } else {
         return "not enough itmes"
       }
        
    }

    //Return the Top 3 monochromatic outfits with ids and scores
    findBestMonos = async (shortest, itemsA, itemsB) => {
        let color = new Color();
        let result = [];
        let topThree = [];

        for (let i = 0; i < shortest.length; i++) {
            const matchingColors = await color.getMono(shortest[i])
            let scores = this.calculateScores(matchingColors, shortest[i], itemsA, itemsB, false);
            
            result.push(...scores);
        }

        //Sort the scores array in descending order
        result.sort((a, b) =>  b.score - a.score);

        //Only return the top three scores.
        if (result.length > 3) {
            topThree = result.slice(0, 3);
            
            return topThree;
        } else {
            return result;
        }
    }

    //Return the Top 3 analogous outfits
    findBestAnalogs =  async (shortest, itemsA, itemsB) => {
        let color = new Color();
        let result = [];
        let topThree = [];

        for (let i = 0; i < shortest.length; i++) {
            const matchingColors = await color.getAnalog(shortest[i])
            let scores = this.calculateScores(matchingColors, shortest[i], itemsA, itemsB, false)
            result.push(...scores);
        }

        //Sort the scores array in ascending order
        result.sort((a, b) => a.score - b.score);

        //Only return the top three scores.
        if (result.length > 3) {
            topThree = result.slice(0, 3);
            return topThree;
        } else {
            return result;
        }
    }

    //Return the Top 3 complementary outfits
    findBestComps =  async (shortest, itemsA, itemsB) => {
        let color = new Color();
        let result = [];
        let topThree = [];

        for (let i = 0; i < shortest.length; i++) {
            const matchingColors = await color.getComp(shortest[i])
            let scores = this.calculateScores(matchingColors, shortest[i], itemsA, itemsB, true)
            result.push(...scores);
        }

        result.sort((a, b) => a.score - b.score);

        //Only return the top three scores.
        if (result.length > 3) {
            topThree = result.slice(0, 3);
            return topThree;
        } else {
            return result;
        }
    }

    //Calculates scores of an outfit
    findScores = async (top, bot, shoes) => {
        let color = new Color();
        let result = {
            mono: 0,
            analog: 0,
            comp: 0
        };
        var matchingColors = [];

        //Calculates score for monochromatic scheme
        matchingColors = await color.getMono(top);
        result.mono = this.getMatchingScore(matchingColors, bot.color, shoes.color)
        

        //Calculates score for analogous scheme
        matchingColors = await color.getMono(top);
        result.analog = this.getMatchingScore(matchingColors, bot.color, shoes.color);

        //Calculates score for complementary scheme
        matchingColors = await color.getComp(top);
        result.comp = this.getMatchingScore(matchingColors, bot.color, shoes.color);

        // console.log("SCORES", result)
        
        return result;
    }

    //Returns the name of the shortest list out of tops, bots, and shoes
    findShortest = (topsLen, botsLen, shoesLen) => {
        if (topsLen < botsLen && topsLen < shoesLen) {
            return "top"
        } else if (botsLen < topsLen && botsLen < shoesLen) {
            return "bot"
        } else {
            return "shoes"
        }
    }

    //Returns the calculated scores for all the combinations between an item's matching colors to lists of other items.
    calculateScores = (mColors, item, itemsA, itemsB, comp) => {
        let result = [];
        if (comp) {
            for (let i = 0; i < itemsA.length; i++) {
                for (let j = 0; j < itemsB.length; j++) {
                    let score = this.getMatchingScore(mColors, itemsA[i].color, itemsB[j].color);
                    let evaluation = { 
                        score : score,
                        clothings: [item, itemsA[i], itemsB[j]]
                    }
                    result.push(evaluation);
                }
            }
        } else {
            for (let i = 0; i < itemsA.length; i++) {
                for (let j = 0; j < itemsB.length; j++) {
                    let score = this.getMatchingScore(mColors, itemsA[i].color, itemsB[j].color);
                    let evaluation = { 
                        score : score,
                        clothings: [item, itemsA[i], itemsB[j]]
                    }
                    result.push(evaluation);
                }
            }
        }
        return result;
    }

    // Calculates cosine similarity (0, 1). Closer to 1 means more similar. Multiply it by 100 at the end.
    getMatchingScore = (matchingColors, colorA, colorB) => {
        var scoreA = [];
        var scoreB = [];

        if (Object.values(colorA).reduce((acc, current) => acc + current, 0) == 0) {
            colorA = { r: 1, g: 1, b: 1}
        }
        if (Object.values(colorB).reduce((acc, current) => acc + current, 0) == 0) {
            colorB = { r: 1, g: 1, b: 1}
        }

        const colorAArray = Object.values(colorA);
        const colorBArray = Object.values(colorB);

        for (const mColors of matchingColors) {
            var mColorsArray = Object.values(mColors);
            if (mColorsArray.reduce((acc, current) => acc + current, 0) == 0) {
                mColorsArray = [1, 1, 1]
            }
            scoreA.push(this.getCosineSimilarity(mColorsArray, colorAArray));
            scoreB.push(this.getCosineSimilarity(mColorsArray, colorBArray));
        }

        const averageScoreA = scoreA.reduce((total, current) => total + current, 0) / scoreA.length;
        const averageScoreB = scoreB.reduce((total, current) => total + current, 0) / scoreB.length;
        const totalScore = (averageScoreA + averageScoreB) / 2 * 100;
        return Math.round(totalScore)

    }

    getDotProduct = (vector1, vector2) => {
        return vector1.reduce((acc, value, index) => acc + value * vector2[index], 0);
    }

    getMagnitude = (vector) => {
        return Math.sqrt(vector.reduce((acc, value) => acc + value * value, 0));
    }

    getCosineSimilarity = (colorA, colorB) => {
        const dotProd = this.getDotProduct(colorA, colorB);
        const mag1 = this.getMagnitude(colorA);
        const mag2 = this.getMagnitude(colorB);
        return dotProd / (mag1 * mag2);
    }

    // Old Algorithm

    // //Returns the matching score between an item's matching color rgbs and other items.
    // //The lower the score, the color matches more.
    // matchingScore = (mColors, colorA, colorB) => {
        
    //     let scoreA = 1000;
    //     let scoreB = 1000;
    //     for (let i = 0; i < mColors.length; i++) {
    //         let mCol = mColors[i];
    //         let tempA = Math.abs(mCol.r - colorA.r) + Math.abs(mCol.g - colorA.g) + Math.abs(mCol.b - colorA.b);
    //         if (tempA < scoreA) {
    //             scoreA = tempA;
    //         }
    //         let tempB = Math.abs(mCol.r - colorB.r) + Math.abs(mCol.g - colorB.g) + Math.abs(mCol.b - colorB.b);
    //         if (tempB < scoreB) {
    //             scoreB = tempB
    //         }
    //     }
    //     return scoreA + scoreB;
    // }

    // matchingScoreComp = (mColors, colorA, colorB) => {
    //     let scoreA = 1000;
    //     let scoreB = 1000;

    //     const contrast = Math.abs(colorB.r - colorA.r) + Math.abs(colorB.g - colorA.g) + Math.abs(colorB.b - colorA.b);
    //     const blackWhiteA = Math.abs(colorA.r - colorA.g) < 10 && Math.abs(colorA.r - colorA.b) < 10 && Math.abs(colorA.g - colorA.b) < 10;
    //     const blackWhiteB = Math.abs(colorB.r - colorB.g) < 10 && Math.abs(colorB.r - colorB.b) < 10 && Math.abs(colorB.g - colorB.b) < 10;
    //     if (contrast > 400 && blackWhiteA && blackWhiteB) {
    //         scoreB = 0;
    //         for (let i = 0; i < mColors.length; i++) {
    //             let mCol = mColors[i];
    //             let tempA = Math.abs(mCol.r - colorA.r) + Math.abs(mCol.g - colorA.g) + Math.abs(mCol.b - colorA.b);
    //             let tempB = Math.abs(mCol.r - colorB.r) + Math.abs(mCol.g - colorB.g) + Math.abs(mCol.b - colorB.b);
    //             let lowest = Math.min(tempA, tempB);
    //             if (lowest < scoreA) {
    //                 scoreA = lowest
    //             }
    //         }   
    //     } else {
    //         for (let i = 0; i < mColors.length; i++) {
    //             let mCol = mColors[i];
    //             let tempA = Math.abs(mCol.r - colorA.r) + Math.abs(mCol.g - colorA.g) + Math.abs(mCol.b - colorA.b);
    //             if (tempA < scoreA) {
    //                 scoreA = tempA;
    //             }
    //             let tempB = Math.abs(mCol.r - colorB.r) + Math.abs(mCol.g - colorB.g) + Math.abs(mCol.b - colorB.b);
    //             if (tempB < scoreB) {
    //                 scoreB = tempB
    //             }
    //         }
    //     }
    //     return scoreA + scoreB;
    // }

}

module.exports = Closet;