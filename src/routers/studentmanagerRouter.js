const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

//导入studentmanagerController

const studentmanagerCTRL = require(path.join(__dirname,'../controllers/studentmanagerController.js'))

studentManagerRouter.get('/list',studentmanagerCTRL.getstudentmanagerPage)

//获取新增页面
studentManagerRouter.get('/add',studentmanagerCTRL.getAddstudentmanagerPage)

//完成新增操作
studentManagerRouter.post('/add',studentmanagerCTRL.addStudentPage)

//完成新增操作
studentManagerRouter.get('/edit/:studentId',studentmanagerCTRL.getEditstudentPage)

//完成修改操作
studentManagerRouter.post('/edit/:studentId',studentmanagerCTRL.editStudent)

//完成删除操作
studentManagerRouter.get('/delete/:studentId',studentmanagerCTRL.deleteStudent)

module.exports = studentManagerRouter