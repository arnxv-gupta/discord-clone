const getDb = require("../controllers/getDb");

async function createServer(req) {
    let db = await getDb()

    let serverObj = {
        name: req.body.name,
        serverIcon: req.body.icon,
        serverID: Math.floor(Math.random() * (999999999 - 111111111) + 111111111),
        membersList: [req.body.adminID],
        channels: [{
            name:"general",
            createdAt: Date.now(),
            channelID: Math.floor(Math.random() * (999999999 - 111111111) + 111111111),
            data:[]
        }],
        adminID: req.body.adminID
    }

    let userObj = await db.collection("userData").findOne({userID: Number(req.body.adminID)})
    console.log(userObj);
    if(userObj==null) {
        // error userID not found
        return {type: "ERROR", msg: "Unable to create server! Invalid adminID."};
    } else {
        await db.collection("userData").updateOne({_id:userObj._id}, {$push: {joinedServers: serverObj.serverID}});
        await db.collection("serverData").insertOne(serverObj);
        console.log(serverObj)
        return {type: "SUCCESS", msg: `Server created! ID: ${serverObj.serverID}`};
    }
}

module.exports = createServer;