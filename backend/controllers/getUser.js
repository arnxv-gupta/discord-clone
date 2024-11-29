const getDb = require("../controllers/getDb")

async function getUser(req) {
    let db = await getDb();
    let data = await db.collection("userData").findOne({userID: Number(req.query.userID)});
    if(data==null) {
        return {type: "ERROR", msg: "Invalid userID"};
    } else {
        return {type: "SUCCESS", msg: `user found`, res: data};
    }
}

module.exports = getUser;