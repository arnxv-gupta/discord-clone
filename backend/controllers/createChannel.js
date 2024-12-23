const getDb = require("../controllers/getDb");

async function createChannel(req) {
    let db = await getDb();

    let channelObj = {
        name:req.body.name,
        type:req.body.type,
        createdAt: Date.now(),
        channelID: Math.floor(Math.random() * (999999999 - 111111111) + 111111111),
        data:[]
    }
    console.log(channelObj);
    
    let nChannelObj = await db.collection("serverData").updateOne({serverID: Number(req.body.serverID)}, {$push: {channels: channelObj}});
    console.log(nChannelObj);
    
    if(nChannelObj.modifiedCount!=1) {
        return {type: "ERROR", msg: "Unable to find server! Invalid serverID."};
    } else {
        return {type: "SUCCESS", data: channelObj.channelID};
    }
}

module.exports = createChannel;