const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

//导出ObjectId
exports.ObjectId = ObjectId
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
            client.close();
            callback(err,docs)
         });  
    })
}

exports.findOne = (collectName,params,callback)=>{
    MongoClient.connect(url,
        {useNewUrlParser:true}, 
        function(err, client) {
        //拿到数据操作的db对象
         const db = client.db(dbName);
         //拿到数据库的集合
         const collection = db.collection(collectName);
         //先根据用户名查询
         collection.findOne(params,(err,doc)=>{
            client.close()
            callback(err,doc)
         });  
    })
}


exports.insertOne = (collectName,params,callback)=>{
    MongoClient.connect(url,
        {useNewUrlParser:true}, 
        function(err, client) {
        //拿到数据操作的db对象
         const db = client.db(dbName);
         //拿到数据库的集合
         const collection = db.collection(collectName);
         //先根据用户名查询
         collection.insertOne(params,(err,result)=>{
            client.close()
            callback(err,result)
         });  
    })
}

exports.updateOne = (collectName,condition,params,callback)=>{
    MongoClient.connect(url,
        {useNewUrlParser:true}, 
        function(err, client) {
        //拿到数据操作的db对象
         const db = client.db(dbName);
         //拿到数据库的集合
         const collection = db.collection(collectName);
         //先根据用户名查询
         collection.updateOne(condition,{ $set: params},(err,result)=>{
            client.close()
            callback(err,result)
         });  
    })

}

exports.deleteOne = (collectName,params,callback)=>{
    MongoClient.connect(url,
        {useNewUrlParser:true}, 
        function(err, client) {
        //拿到数据操作的db对象
         const db = client.db(dbName);
         //拿到数据库的集合
         const collection = db.collection(collectName);
         //先根据用户名查询
         collection.deleteOne(params,(err,result)=>{
            client.close()
            callback(err,result)
         });  
    })
}