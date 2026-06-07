const fs=require("fs");
// fs.readFile('content .txt','utf8',(err,data)=>{
//     console.log(err,data)
// })   

// const a=fs.readFileSync("content.txt")
// console.log(a.toString()) 

// fs.writeFile("content.txt","3.file module",()=>{
//     console.log("written to the file")
// })

const a=fs.writeFileSync("content.txt","my nam is lalit")
console.log(a)
console.log("finished reading file");