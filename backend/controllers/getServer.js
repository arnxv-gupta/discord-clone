const getDb = require("../controllers/getDb")

async function getServer(req) {
    
    let db = await getDb();
    let data = await db.collection("serverData").findOne({serverID: Number(req.query.serverID)});
    
    if(data==null) {
        return {type: "ERROR", msg: "Invalid serverID"};
    } else {
        return {type: "SUCCESS", msg: `Server found`, res: data};
    }
}

module.exports = getServer;