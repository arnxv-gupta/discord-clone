const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
const cors = require("cors");
const getDb = require("./controllers/getDb.js");
const path = require("path")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads");
    },
    filename: (req, file, cb)=>{

        cb(null, Date.now() + "-pfp-" + file.originalname);
    }
})
const upload = multer({storage});


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));
app.use(session({
    secret:"disrd",
    saveUninitialized:false,
    resave: false
}));

const PORT = 3030;
const mongoURL = "";

app.get("/", async (req, res)=>{
    res.send("Discord clone!")
})

// auth
app.post("/createAccount", async (req, res)=>{

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

app.post("/loginAccount", async (req, res)=>{
    
    let db = await getDb();

    let data = await db.collection("userData").findOne({email:req.body.email, password:req.body.password});

    if(data==null) {
        //error
        res.json({type:"ERROR", msg: `Unable to login! Email or password was invalid.`})
    } else {
        

        res.json({type: "SUCCESS", msg: `Logged in as ${data.username} (${data.userID}).`, res: data.userID});
    }

});

app.get("/getAuth", (req, res)=>{
    console.log(req.session.auth);
    
    if(req.session.auth) {
        res.json({type: "SUCCESS", msg:"User authenticated.", res: req.session.auth});
    } else {
        res.json({type:"ERROR", msg: "User authentication failed!"});
    }
})

// server

app.post("/createServer", async (req, res)=>{
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

app.get("/joinServer", async (req, res)=>{
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

app.post("/sendMessage", async (req, res)=>{
    let db = await getDb();
    let chatObj = {
        authorID: req.body.authorID,
        timestamp: Date.now(),
        data: req.body.text
    }
    let data = await db.collection("serverData").findOne({serverID: Number(req.body.serverID), "channels.channelID": Number(req.body.channelID)});
    console.log(data);
    
    if(data!=null) {
        let channel= await db.collection("serverData").updateOne({serverID: data.serverID, "channels.channelID": Number(req.body.channelID)});
        console.log(channel);
        
        if(channel!=null) {
            //db.collection("serverData").updateOne({serverID: data.serverID, "channels.channelID": Number(req.body.channelID) }, {$push: });
            res.json({type: "SUCCESS", msg: `Chat sent!`});
        } else {
            res.json({type: "ERROR", msg: "Invalid channelID"});
        }
       
    } else {
        res.json({type: "ERROR", msg: "Invalid serverID"});
    }
})

// info
app.get("/serverInfo", async (req, res)=>{

    let db = await getDb();

    let data = await db.collection("serverData").findOne({serverID: Number(req.query.serverID)});
    
   if(data==null) {
    
    res.json({type: "ERROR", msg: "Invalid serverID"});

   } else {
    res.json({type: "SUCCESS", msg: `Server found`, res: data});

   }
});

app.get("/userInfo", async (req, res)=>{

    let db = await getDb();

    let data = await db.collection("userData").findOne({userID: Number(req.query.userID)});

   if(data==null) {
    
    res.json({type: "ERROR", msg: "Invalid userID"});

   } else {
    res.json({type: "SUCCESS", msg: `user found`, res: data});

   }
})


// misc

app.post("/uploadImage", upload.single("image"), (req, res)=>{
    console.log(req.file);
    
    if(req.file==undefined) {
        res.json({type:"ERROR",msg: "Error uploading image!"});
    } else {
        res.json({type:"SUCCESS",msg: "Image uploaded!", res: "http://localhost:3030/uploads/"+req.file.filename});

    }
})


app.listen(PORT, ()=>{
    console.log("Server started!");
});