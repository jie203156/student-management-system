const xtpl = require('xtpl');
const path = require('path')
const MongoClient = require('mongodb').MongoClient
// Connection URL
const url = 'mongodb://localhost:27017';


// Database Name
const dbName = 'jie';
//最终处理 , 返回获取到的学生列表页面
exports.getstudentmanagerPage = (req,res)=>{

    const keyword = req.query.keyword || ""

    // Use connect method to connect to the server
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    
        // 拿到db对象
        const db = client.db(dbName);

        //拿到集合
        const collection = db.collection('studentInfo');

        collection.find({name:{$regex:keyword}}).toArray((req,docs)=>{
            // 关闭与数据库的连接 
            client.close();

            xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
                students:docs,
                keyword
            },function(error,content){
                res.send(content)
            });
        })
    });

}

