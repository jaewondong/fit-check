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
        let data = null;
        await USER.findOneAndUpdate({
            username: username
        }, {
            $push: { closet: clothingData }
        })
        .then(response => data = response.closet)
        .catch(error => console.error(error))
        return data;

        
    }

    //Deletes a clothing item from the user's closet in mongoDB and returns the previous closet.
    delClothingData = async (username, clothingData) => {
        let data = null;
        //console.log(clothingData);
        await USER.findOneAndUpdate({
            username: username
        }, {
            $pull: { closet: clothingData }
        })
        .then(response => data = response.closet)
        .catch(error => console.error(error))
        return data;
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
            result = {
                bestMonos: bestMonos,
                bestAnalogs: bestAnalogs,
                bestComps: bestComps
            };
            console.log(JSON.stringify(result));
            
       } else {
         return "not enough itmes"
       }
        
        //console.log("find best fits from:"+closetData);
    }

    //Return the Top 3 monochromatic outfits with ids and scores
    findBestMonos = async (shortest, itemsA, itemsB) => {
        let color = new Color();
        let matchingColors = [];
        let result = [];
        let topThree = [];
        for (let i = 0; i < shortest.length; i++) {
            await color.getMono(shortest[i])
            .then(res => matchingColors = res)
            .catch(error => console.error(error))
            let scores = this.calculateScores(matchingColors, shortest[i]._id, itemsA, itemsB);
            
            result.push(scores);
        }

        //Sort the scores array in ascending order
        result.sort(function(a, b) {
            return a.score - b.score
        });

        //Only return the top three scores.
        if (result.length > 3) {
            topThree = result.slice(3);
            return topThree;
        } else {
            return result;
        }
    }

    //Return the Top 3 analogous outfits
    findBestAnalogs =  async (shortest, itemsA, itemsB) => {
        let color = new Color();
        let matchingColors = [];
        let result = [];
        let topThree = [];
        for (let i = 0; i < shortest.length; i++) {
            await color.getAnalog(shortest[i])
            .then(res => matchingColors = res)
            .catch(error => console.error(error))
            let scores = this.calculateScores(matchingColors, shortest[i]._id, itemsA, itemsB)
            result.push(scores);
        }

        //Sort the scores array in ascending order
        result.sort(function(a, b) {
            return a.score - b.score
        });

        //Only return the top three scores.
        if (result.length > 3) {
            topThree = result.slice(3);
            return topThree;
        } else {
            return result;
        }
    }

    //Return the Top 3 complementary outfits
    findBestComps =  async (shortest, itemsA, itemsB) => {
        let color = new Color();
        let matchingColors = [];
        let result = [];
        let topThree = [];
        for (let i = 0; i < shortest.length; i++) {
            await color.getComp(shortest[i])
            .then(res => matchingColors = res)
            .catch(error => console.error(error))
            let scores = this.calculateScores(matchingColors, shortest[i]._id, itemsA, itemsB)
            result.push(scores);
        }

        result.sort(function(a, b) {
            return a.score - b.score
        });

        //Only return the top three scores.
        if (result.length > 3) {
            topThree = result.slice(3);
            return topThree;
        } else {
            return result;
        }
    }

    //Return the name of the shortest list out of tops, bots, and shoes
    findShortest = (topsLen, botsLen, shoesLen) => {
        if (topsLen < botsLen && topsLen < shoesLen) {
            return "top"
        } else if (botsLen < topsLen && botsLen < shoesLen) {
            return "bot"
        } else {
            return "shoes"
        }
    }

    //Return the calculated scores for all the combinations between an item's matching colors to lists of other items.
    calculateScores = (mColors, id, itemsA, itemsB) => {
        let result = [];
        for (let i = 0; i < itemsA.length; i++) {
            for (let j = 0; j < itemsB.length; j++) {
                let score = this.matchingScore(mColors, itemsA[i].color, itemsB[j].color);
                let evaluation = { 
                    score : score,
                    ids: [id, itemsA[i]._id, itemsB[j]._id]
                }
                result.push(evaluation);
            }
        }
        return result;
    }

    //Returns the matching score between an item's matching color rgbs and other items.
    //The lower the score, the color matches more.
    matchingScore = (mColors, colorA, colorB) => {
        
        let scoreA = 1000;
        let scoreB = 1000;
        for (let i = 0; i < mColors.length; i++) {
            let mCol = mColors[i];
            let tempA = Math.abs(mCol.r - colorA.r) + Math.abs(mCol.g - colorA.g) + Math.abs(mCol.b - colorA.b);
            if (tempA < scoreA) {
                scoreA = tempA;
            }
            let tempB = Math.abs(mCol.r - colorB.r) + Math.abs(mCol.g - colorB.g) + Math.abs(mCol.b - colorB.b);
            if (tempB < scoreB) {
                scoreB = tempB
            }
        }
        return scoreA + scoreB;
    }

}

module.exports = Closet;