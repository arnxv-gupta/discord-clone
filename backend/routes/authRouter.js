const express = require("express");
const router = express.Router();
const getDb = require("../controllers/getDb")

// auth
router.post("/createAccount", async (req, res)=>{

    let db = await getDb();    
    console.log(req.body);
    

    if(await db.collection("userData").findOne({email: req.body.email})!=null) {
        // user already exists
        res.json({type:"ERROR",msg: "User already exists!"});
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

        res.json({type: "SUCCESS", msg: "Created new user."});
    }
});

router.post("/loginAccount", async (req, res)=>{

    let db = await getDb();

    let data = await db.collection("userData").findOne({email:req.body.email, password:req.body.password});

    if(data==null) {
        //error
        res.json({type:"ERROR", msg: `Unable to login! Email or password was invalid.`})
    } else {
        

        res.json({type: "SUCCESS", msg: `Logged in as ${data.username} (${data.userID}).`, res: data.userID});
    }

});

router.get("/getAuth", (req, res)=>{
    console.log(req.session.auth);
    
    if(req.session.auth) {
        res.json({type: "SUCCESS", msg:"User authenticated.", res: req.session.auth});
    } else {
        res.json({type:"ERROR", msg: "User authentication failed!"});
    }
})

module.exports = router;