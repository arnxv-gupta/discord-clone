const getDb = require("../controllers/getDb")

async function createAccount(req) { 

    let db = await getDb();    
    console.log(req.body);

    if(await db.collection("userData").findOne({email: req.body.email})!=null) {
        // user already exists
        return {type:"ERROR",msg: "User already exists!"};
    } else {
        // missing tag (#)
        let userObj = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            userID: Math.floor(Math.random() * (999999999 - 111111111) + 111111111),
            pfpURL: req.body.pfpImage,
            createdAt: Date.now(),
            onlinePresence: "offline",
            joinedServers:[],
            friends: []
        }

        await db.collection("userData").insertOne(userObj, (err, res)=>{
            if(err) {
                console.log(err);
            } else {
                console.log("Created new user!");
                
            }
        });

        return {type: "SUCCESS", msg: "Created new user."};
    }
}

module.exports = createAccount;