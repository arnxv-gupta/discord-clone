const express = require("express");
const router = express.Router();
const getDb = require("../controllers/getDb")

router.post("/createServer", async (req, res)=>{
    console.log(req.body);
    
    let db = await getDb()

    let serverObj = {
        name: req.body.name,
        serverIcon: null,
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
        res.json({type: "ERROR", msg: "Unable to create server! Invalid adminID."})
    } else {
        await db.collection("userData").updateOne({_id:userObj._id}, {$push: {joinedServers: serverObj.serverID}});
        await db.collection("serverData").insertOne(serverObj);

        res.json({type: "SUCCESS", msg: `Server created! ID: ${serverObj.serverID}`});
    }
});

router.get("/joinServer", async (req, res)=>{
    //almost works
    let db = await getDb();

    let serverObj = await db.collection("serverData").findOne({serverID: Number(req.query.serverID)});
    console.log(serverObj);
    
    if(serverObj==null) {
        res.json({type: "ERROR", msg: "Invalid serverID."});
    } else {
        if(serverObj.membersList.indexOf(req.body.userID)==-1) {
            await db.collection("serverData").updateOne({serverID: serverObj.serverID}, {$push: {membersList: req.query.userID}});
            await db.collection("userData").updateOne({userID: Number(req.body.userID)}, {$push: {joinedServers: Number(req.query.serverID)}});

            res.json({type: "SUCCESS", msg: `Server joined!`});

        } else {
            res.json({type: "ERROR", msg: "Already in server."});
 
        }
    }

});

router.post("/sendMessage", async (req, res)=>{
    let db = await getDb();
    let chatObj = {
        authorID: req.body.authorID,
        timestamp: Date.now(),
        data: req.body.text
    }
    let data = await db.collection("serverData").findOne({serverID: Number(req.body.serverID), "channels.channelID": Number(req.body.channelID)});
    console.log(data);
    
    if(data!=null) {
        let channel= await db.collection("serverData").findOne({serverID: data.serverID, "channels.channelID": Number(req.body.channelID)});
    //     console.log(channel);
        
        if(channel!=null) {
            db.collection("serverData").updateOne({serverID: data.serverID, "channels.channelID": Number(req.body.channelID) }, {$push: {"channels.$.data": chatObj}});
            res.json({type: "SUCCESS", msg: `Chat sent!`});
        } else {
            res.json({type: "ERROR", msg: "Invalid channelID"});
        }
       
    } else {
        res.json({type: "ERROR", msg: "Invalid serverID"});
    }
})

// info
router.get("/serverInfo", async (req, res)=>{

    let db = await getDb();

    let data = await db.collection("serverData").findOne({serverID: Number(req.query.serverID)});
    
   if(data==null) {
    
    res.json({type: "ERROR", msg: "Invalid serverID"});

   } else {
    res.json({type: "SUCCESS", msg: `Server found`, res: data});

   }
});

module.exports=router;