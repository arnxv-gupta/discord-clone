const getDb = require("../controllers/getDb")

async function loginAccount(req) {
    let db = await getDb();
    let data = await db.collection("userData").findOne({email:req.body.email, password:req.body.password});
    if(data==null) {
        //error
        return {type:"ERROR", msg: `Unable to login! Email or password was invalid.`};
    } else {
        return {type: "SUCCESS", msg: `Logged in as ${data.username} (${data.userID}).`, res: data.userID};
    }
}

module.exports = loginAccount;