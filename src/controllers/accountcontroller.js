const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const captchapng = require('captchapng');
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'jie';

//导出登录页面
exports.getLoginPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/login.html'))
}
//导出注册页面
exports.getRegisterPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/register.html'))
}


//最终处理 , 把用户名和密码保存起来 , 并且返回结果给浏览器
exports.register = (req,res)=>{
    const result = {status:0, message:"注册成功"}

    //去数据库中查询 , 用户名是否已经存在 , 如果已经存在 , 则返回用户名存在给浏览器

    // Use connect method to connect to the server
    MongoClient.connect(url,{useNewUrlParser:true}, function(err, client) {
       //拿到数据操作的db对象
        const db = client.db(dbName);
        //拿到数据库的集合
        const collection = db.collection('accountInfo');
        //先根据用户名查询
        collection.findOne({username:req.body.username},(err,doc)=>{
            if(doc){ // 用户名存在
                
                //关掉和数据库的连接
                client.close();
                //更改返回的状态
                result.status = 1
                result.message = "用户名已经存在"
                

                res.json(result)
            }else{//用户名不存在    
             //如果用户名不存在 , 则先要把我们的数据插入到数据库中 , 然后返回注册成功给浏览器

             collection.insertOne(req.body,(err,result2)=>{

                //关掉和数据库的连接
                client.close();
                 if (result2 == null){ //失败
                    result.status = 2
                    result.message = "注册失败"
                 }

                 res.json(result)
             })
            }
        })
    });  
}

//最终处理 , 返回图片验证码
exports.getVcodeImage = (req,res)=>{

    const vcode = parseInt(Math.random()*9000+1000)

    var p = new captchapng(80,30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}