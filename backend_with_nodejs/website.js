const {Console}=require("console");
const fs=require('fs');
const http=require('http');
const port=process.env.PORT || 3000;
const server=http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html')
    console.log(req.url)

    if(req.url=='/'){
        res.statusCode=200;
        const data=fs.readFileSync('index.html');
        res.end(data.toString());
    }

    
    else if(req.url=='/cwh'){
         res.statusCode=200;
        res.end('<h1>This is CodeWithHarry</h1> <p>hey this is way to rock the world</p> ');
    }
    else if (req.url=='/about'){
         res.statusCode=200;
        res.end('<h1>about CodeWithHarry</h1> <p>hey this is way to rock the world</p> ');
    }
    else{
         res.statusCode=404;
         res.end('<h1>not found</h1> <p>page not found</p> ');
    }

    
    
})

server.listen(port,()=>{
    console.log("server is listening on port ");
    console.log(port);
});