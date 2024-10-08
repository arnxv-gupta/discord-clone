const express = require("express");
const app = express();
const fs = require("fs");
const uuid = require("uuid");
const session = require("express-session")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret:"discord"
}));

const PORT = 3030;

app.get("/", (req, res)=>{
    res.send("Discord clone!")
})

// auth
app.post("/createAccount", (req, res)=>{
    console.log(req.body);

    let data = JSON.parse(fs.readFileSync("./data.json"));
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
            userID: uuid.v4(),
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
        res.json({type: "SUCCESS", msg: `Logged in as ${data[0].username} (${data[0].userID}).`, res: data[0].joinedServers});
    }
});

// server

app.post("/createServer", (req, res)=>{
    let data = JSON.parse(fs.readFileSync("./data.json"));
    
    let serverObj = {
        name: req.body.name,
        serverIcon: null,
        serverID: uuid.v4(),
        membersList: [req.body.adminID],
        adminID: req.body.adminID
    }

    let pos=data.userData.findIndex((el)=>el.userID==req.body.adminID);
    console.log(pos);

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

// app.post("/joinServer", (req, res)=>{
// });


app.listen(PORT, ()=>{
    console.log("Server started!");
});