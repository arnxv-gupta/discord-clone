const express = require("express");
const router = express.Router();

const getServer = require("../controllers/getServer");
const joinServer = require("../controllers/joinServer");
const createServer = require("../controllers/createServer")
const sendMessage = require("../controllers/sendMessage")

router.post("/createServer", async (req, res)=>{
    res.json(await createServer(req));
});

router.get("/joinServer", async (req, res)=>{
    res.json(await joinServer(req));
});

// info
router.get("/serverInfo", async (req, res)=>{
    res.json(await getServer(req));
});

router.post("/sendMessage", async (req, res)=>{
    res.json(await sendMessage(req));
})

module.exports=router;