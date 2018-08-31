//1. 导入express
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')


//2. 创建应用
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))

//all  是代表支持get/post方法 , 这个all方法要写在集成路由之前
app.all('/*',(req,res,next)=>{
    // console.log(req.url);
    if(req.url.includes('account')){
        next()
    }else{
        if(req.session.loginName){
            next()
        }else{
            res.send(`<script>alert("您还没有登录");window.location.href = "/account/login"</script>`)
            
        }
    }
    
    
})

//3. 集成路由
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
app.use('/account',accountRouter)

//导入studentManagerRouter
const studentManagerRouter = require(path.join(__dirname,"./routers/studentmanagerRouter.js"))
app.use('/studentmanager',studentManagerRouter)


//4. 开启web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
        
    }
    console.log("start OK");
    
})