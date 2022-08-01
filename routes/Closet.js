/** Class to connect to the user's closet in the mongoDB database */

const USER = require('../model/User');

class Closet {

    getClosetData = async (username) => {
        return USER.findOne({username: username});
    }

    saveClosetData = async (username, closetData) => {
        const filter = {
            username: username
        }

        const replace = {
            ...filter,
            ...closetData
        }

        await this.findOneReplace(filter, closetData);
    }

    findOneReplace = async (filter, replace) => {
        await USER.findOneAndReplace(filter, replace, {new: true, upsert: true});
    }
}

module.exports = Closet;