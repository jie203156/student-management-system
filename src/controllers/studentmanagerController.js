const xtpl = require('xtpl');
const path = require('path')
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))

//最终处理 , 返回获取到的学生列表页面
exports.getstudentmanagerPage = (req,res)=> {

    const keyword = req.query.keyword || ""
    databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        
        xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
            students:docs,
            keyword
        },function(error,content){
            res.send(content)
        })
    })
}




