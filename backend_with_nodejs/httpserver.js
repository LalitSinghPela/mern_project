const {Console}=require("console");
const http=require('http');
const port=process.env.PORT || 3000;
const server=http.createServer((req,res)=>{
    console.log(req.url)
    res.statusCode=200;
    res.setHeader('Content-Type','text/html')
    res.end('<h1>This is CodeWithHarry</h1> <p>hey this is way to rock the world</p> ');

})

server.listen(port,()=>{
    console.log('server is on port ');
    console.log(port)
});