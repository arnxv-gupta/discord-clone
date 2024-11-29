const getDb = require("../controllers/getDb")

async function joinServer(req) {
    //almost works
    let db = await getDb();

    let serverObj = await db.collection("serverData").findOne({serverID: Number(req.query.serverID)});
    console.log(serverObj);

    
    if(serverObj==null) {
        return {type: "ERROR", msg: "Invalid serverID."};
    } else {
        if(serverObj.membersList.indexOf(Number(req.query.userID))==-1) {
            await db.collection("serverData").updateOne({serverID: serverObj.serverID}, {$push: {membersList: req.query.userID}});
            console.log(await db.collection("userData").updateOne({userID: Number(req.query.userID)}, {$push: {joinedServers: Number(req.query.serverID)}}));

            return {type: "SUCCESS", msg: `Server joined!`};

        } else {
            return {type: "ERROR", msg: "Already in server."};
 
        }
    }
}

module.exports = joinServer;