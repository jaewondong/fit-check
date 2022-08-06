/** Class to connect to the user's closet in the mongoDB database */

const USER = require('../model/User');

class Closet {

    getClosetData = async (username) => {
        return USER.findOne({username: username});
    }

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

    delClothingData = async (username, clothingData) => {
        let data = null;
        console.log(clothingData);
        await USER.findOneAndUpdate({
            username: username
        }, {
            $pull: { closet: clothingData }
        })
        .then(response => data = response.closet)
        .catch(error => console.error(error))
        return data;
    }

}

module.exports = Closet;