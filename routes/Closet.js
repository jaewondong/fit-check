/** Class to connect to the user's closet in the mongoDB database */

const USER = require('../model/User');

class Closet {

    getClosetData = async (username) => {
        return USER.findOne({username: username});
    }

    addClosetData = async (username, closetData) => {
        let data = null;
        console.log(username);
        console.log(closetData)
        await USER.findOneAndUpdate({
            username: username
        }, {
            $push: { closet: closetData }
        })
        .then(response => data = response.closet)
        .catch(error => console.error(error))
        return data;

        
    }

}

module.exports = Closet;