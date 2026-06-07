const express=require('express');
const app=express()
const port =3000

app.get('/',(req,res)=>{
    // const data=fs.readFileSync('index.html');
    //  res.send(data.toString());
    res.send("hello world2")
})

app.get('/about',(req,res)=>{
    res.send("this is an about page!");
})

app.listen(port,()=>{
    console.log('example app listening at http://localhost:');
    console.log(port);
})