const EventEmitter = require("events");
let emitter = new EventEmitter();

emitter.on("join", (msg)=>{
    console.log(msg);
})


module.exports = emitter;