const express=require('express');
const app=express();
const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true } for security like https
}))

app.get('/viewCount',(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(req.session.count);
})

app.get('/setname',(req,res)=>{
    req.session.username="aparna gautam";
    res.redirect('/greet');
})

app.get('/greet',(req,res)=>{
    let{username="anonymous"}=req.session;
    res.send(username);
})

app.listen(8080,(req,res)=>{

})
