const xtpl = require('xtpl');
const path = require('path')
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))

//最终处理 , 返回获取到的学生列表页面
exports.getstudentmanagerPage = (req,res)=> {

    const keyword = req.query.keyword || ""
    databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        
        xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
            students:docs,
            keyword,
            loginName:req.session.loginName
        },function(error,content){
            res.send(content)
        })
    })
}
//最终处理 , 返回新增学生页面
exports.getAddstudentmanagerPage = (req,res)=>{
    xtpl.renderFile(path.join(__dirname,'../statics/views/add.html'),{
    },function(error,content){
        res.send(content)
    })
}

//最终处理 , 返回新增操作之后的html(html中有一段可以执行js)
exports.addStudentPage = (req,res)=>{
    databasetool.insertOne('studentInfo',req.body,(err,result)=>{

        if(result == null){
            res.send(`<script>alert("新增失败")</script>`)
        }else{
            res.send(`<script>window.location.href="/studentmanager/list"</script>`)
        }
    })
}

exports.getEditstudentPage = (req,res)=>{
    databasetool.findOne('studentInfo',{_id:databasetool.ObjectId(req.params.studentId)},(err,doc)=>{
        xtpl.renderFile(path.join(__dirname,"../statics/views/edit.html"),{
            student:doc
        },function(error,content){
            res.send(content)
        })
    })
}


exports.editStudent = (req,res)=>{
    databasetool.updateOne('studentInfo',{_id:databasetool.ObjectId(req.params.studentId)},req.body,(err,result)=>{
        if(result == null){
            res.send(`<script>alert("修改失败")</script>`)
        }else{
            res.send(`<script>window.location.href="/studentmanager/list"</script>`)
        }

    })
}

exports.deleteStudent = (req,res)=>{
    databasetool.deleteOne('studentInfo',{_id:databasetool.ObjectId(req.params.studentId)},(err,result)=>{
        if(result == null){
            res.send(`<script>alert("删除失败")</script>`)
        }else{
            res.send(`<script>window.location.href="/studentmanager/list"</script>`)
        }
    })
}




