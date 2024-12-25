const serverModel = require("../models/serverModel");

async function sendMessage(req) {

    let chatObj = {
        authorID: req.body.authorID,
        timestamp: Date.now(),
        data: req.body.text,
        image: req.body.image
    }
    let data = await serverModel.findOne({serverID: Number(req.body.serverID), "channels.channelID": Number(req.body.channelID)});
    //console.log(data);
    
    if(data!=null) {
        let channel= await serverModel.findOne({serverID: data.serverID, "channels.channelID": Number(req.body.channelID)});
    //     console.log(channel);
        
        if(channel!=null) {
            await serverModel.updateOne({serverID: data.serverID, "channels.channelID": Number(req.body.channelID) }, {$push: {"channels.$.data": chatObj}});
            return {type: "SUCCESS", msg: `Chat sent!`};
        } else {
            return {type: "ERROR", msg: "Invalid channelID"};
        }
       
    } else {
        return {type: "ERROR", msg: "Invalid serverID"};
    }
}

module.exports = sendMessage;