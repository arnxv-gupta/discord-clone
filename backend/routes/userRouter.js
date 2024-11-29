const express = require("express");
const router = express.Router();

const getUser = require("../controllers/getUser")

router.get("/userInfo", async (req, res)=>{
    res.json(await getUser());
})


module.exports = router;