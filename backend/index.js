const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const PORT = 3030;

app.get("/", (req, res)=>{
    res.send("Discord clone!")
})

app.post("/createAccount", (req, res)=>{
    console.log(req.body);

    if(req.body==null)
        return;


    
    let data = JSON.parse(fs.readFileSync("./data.json"));
    data=data.filter((el)=>{
        return el.email==req.body.email
    });

    if(data.length!=0) {
        // user already exists
        res.json({type:"ERROR",msg: "User already exists!"});
    } else {
        let userObj = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            createdAt: Date.now(),
            onlinePresence: "offline"
        }
        data = JSON.parse(fs.readFileSync("./data.json"));
        data.push(userObj);
        fs.writeFileSync("./data.json", JSON.stringify(data));
        res.json({type: "SUCCESS", msg: "Created new user."});
    }
});

app.listen(PORT, ()=>{
    console.log("Server started!");
});