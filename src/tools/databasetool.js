const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'jie';




exports.findList = (collectName,params,callback)=>{

    MongoClient.connect(url,
        {useNewUrlParser:true}, 
        function(err, client) {
        //拿到数据操作的db对象
         const db = client.db(dbName);
         //拿到数据库的集合
         const collection = db.collection(collectName);
         //先根据用户名查询
         collection.find(params).toArray((err,docs)=>{
            callback(err,docs)
         });  
    })
}