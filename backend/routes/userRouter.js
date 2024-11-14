const express = require("express");
const router = express.Router();
const getDb = require("../controllers/getDb")

router.get("/userInfo", async (req, res)=>{

    let db = await getDb();

    let data = await db.collection("userData").findOne({userID: Number(req.query.userID)});

   if(data==null) {
    
    res.json({type: "ERROR", msg: "Invalid userID"});

   } else {
    res.json({type: "SUCCESS", msg: `user found`, res: data});

   }
})


module.exports = router;