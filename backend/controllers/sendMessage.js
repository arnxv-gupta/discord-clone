const getDb = require("../controllers/getDb");

async function sendMessage(req) {
    let db = await getDb();
    let chatObj = {
        authorID: req.body.authorID,
        timestamp: Date.now(),
        data: req.body.text
    }
    let data = await db.collection("serverData").findOne({serverID: Number(req.body.serverID), "channels.channelID": Number(req.body.channelID)});
    //console.log(data);
    
    if(data!=null) {
        let channel= await db.collection("serverData").findOne({serverID: data.serverID, "channels.channelID": Number(req.body.channelID)});
    //     console.log(channel);
        
        if(channel!=null) {
            db.collection("serverData").updateOne({serverID: data.serverID, "channels.channelID": Number(req.body.channelID) }, {$push: {"channels.$.data": chatObj}});
            return {type: "SUCCESS", msg: `Chat sent!`};
        } else {
            return {type: "ERROR", msg: "Invalid channelID"};
        }
       
    } else {
        return {type: "ERROR", msg: "Invalid serverID"};
    }
}

module.exports = sendMessage;