const express = require("express");
const app = express();
const fs = require("fs");
const { customAlphabet } = require('nanoid')
const session = require("express-session");
const cors = require("cors");
const {MongoClient, Collection} = require("mongodb");
const getDb = require("./controllers/getDb.js")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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
    console.log(req.body);
    let db = await getDb("mongodb+srv://avirana3449:mRvGme1MyLwisntH@cluster0.lgdme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ,"userData");
    await db.collection("userData").insertOne({name:"aVI"}, (err, res)=>{
        if(err) {
            console.log(err);
        } else {
            console.log("Inserted!");
            
        }
    });
    data=data.userData.filter((el)=>{
        return el.email==req.body.email
    });

    if(data.length!=0) {
        // user already exists
        res.json({type:"ERROR",msg: "User already exists!"});
    } else {
        // missing tag (#)
        let userObj = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            userID: Math.floor(Math.random() * (999999999 - 111111111) + 111111111),
            pfpURL: null,
            createdAt: Date.now(),
            onlinePresence: "offline",
            joinedServers:[],
            friends: []
        }
        data = JSON.parse(fs.readFileSync("./data.json"));
        data.userData.push(userObj);
        fs.writeFileSync("./data.json", JSON.stringify(data));
        res.json({type: "SUCCESS", msg: "Created new user."});
    }
});

app.post("/loginAccount", (req, res)=>{
    
    let data = JSON.parse(fs.readFileSync("./data.json"));
    data=data.userData.filter((el)=>{
        return el.email == req.body.email && el.password==req.body.password;
    })

    if(data.length==0) {
        //error
        res.json({type:"ERROR", msg: `Unable to login! Email or password was invalid.`})
    } else {

        req.session.auth=data[0].userID;
       // req.session.save();
        console.log(req.session.auth);
        

        res.json({type: "SUCCESS", msg: `Logged in as ${data[0].username} (${data[0].userID}).`, res: data[0].userID});
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

app.post("/createServer", (req, res)=>{
    console.log(req.body);
    
    let data = JSON.parse(fs.readFileSync("./data.json"));
    
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

    let pos=data.userData.findIndex((el)=>el.userID==req.body.adminID);
    console.log(serverObj);

    if(pos==-1) {
        // error userID not found
        res.json({type: "ERROR", msg: "Unable to create server! Invalid adminID."})
    } else {
        data.userData[pos].joinedServers.push(serverObj.serverID);
        data.serverData.push(serverObj);

        fs.writeFileSync("./data.json", JSON.stringify(data));

        res.json({type: "SUCCESS", msg: `Server created! ID: ${serverObj.serverID}`});
    }
});

app.get("/joinServer", (req, res)=>{
    let data = JSON.parse(fs.readFileSync("./data.json"));
});

app.post("/sendMessage", (req, res)=>{
    let data =  JSON.parse(fs.readFileSync("./data.json"));
    let chatObj = {
        authorID: req.body.authorID,
        timestamp: Date.now(),
        data: req.body.text
    }
    
    let pos=(data.serverData.map(el=>el.serverID)).indexOf(Number(req.body.serverID));
    
    if(pos!=-1) {
        let channelPos= data.serverData[pos].channels.map(el=>el.channelID).indexOf(Number(req.body.channelID));
        
        if(channelPos!=-1) {
            data.serverData[pos].channels[channelPos].data.push(chatObj);
            fs.writeFileSync("./data.json", JSON.stringify(data));
            res.json({type: "SUCCESS", msg: `Chat sent!`});
        } else {
            res.json({type: "ERROR", msg: "Invalid channelID"});
        }
       
    } else {
        res.json({type: "ERROR", msg: "Invalid serverID"});
    }
})

// info
app.get("/serverInfo", (req, res)=>{
    let data = JSON.parse(fs.readFileSync("./data.json"));

   data=data.serverData.filter((el)=>{
    return req.query.serverID == el.serverID;
   })

   if(data.length==0) {
    
    res.json({type: "ERROR", msg: "Invalid serverID"});

   } else {
    res.json({type: "SUCCESS", msg: `Server found`, res: data[0]});

   }
});

app.get("/userInfo", (req, res)=>{
    let data = JSON.parse(fs.readFileSync("./data.json"));

   data=data.userData.filter((el)=>{
    return req.query.userID == el.userID;
   })

   if(data.length==0) {
    
    res.json({type: "ERROR", msg: "Invalid userID"});

   } else {
    res.json({type: "SUCCESS", msg: `user found`, res: data[0]});

   }
})



app.listen(PORT, ()=>{
    console.log("Server started!");
});