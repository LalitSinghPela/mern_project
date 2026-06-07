const EventEmitter= require("events");
class MyEmitter extends EventEmitter {}
const myEmitter=new MyEmitter();
myEmitter.on("waterfull",()=>{
    console.log("plz turn off motors!");
    setTimeout(()=>{console.log("plz turn off"); },3000);

});


console.log("the script is running ")
myEmitter.emit("waterfull");
console.log("it is still runnning")