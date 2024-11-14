const express = require("express");
const app = express();
const cors = require("cors");
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
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 3030;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));

const serverRouter = require("./routes/serverRouter.js")
const authRouter = require("./routes/authRouter.js")
const userRouter = require("./routes/userRouter.js")

app.use("/", serverRouter);
app.use("/", authRouter);
app.use("/", userRouter);


// misc

app.post("/uploadImage", upload.single("image"), (req, res)=>{
    console.log(req.file);
    
    if(req.file==undefined) {
        res.json({type:"ERROR",msg: "Error uploading image!"});
    } else {
        res.json({type:"SUCCESS",msg: "Image uploaded!", res: "http://localhost:3030/uploads/"+req.file.filename});

    }
})


//
// send update

io.on("connection", (socket)=>{
    console.log("A user connected!");
    
})


server.listen(PORT, ()=>{
    console.log("Server started!");
});