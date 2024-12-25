const userModel = require("../models/userModel");

async function updateUser(userObj) {
    if(await userModel.updateOne({userID: userObj.userID}, userObj)) {
        console.log("Success");
    } else {
        console.log("err")
    }
}

module.exports = updateUser;