//1. 导入 express
const express = require('express')
const path = require('path')

//2. 创建路由
const accountRouter = express.Router()

//导入控制器
const accountCTRL = require(path.join(__dirname,"../controllers/accountcontroller.js"))

//3. 处理具体的请求
//获取登录界面
accountRouter.get('/login',accountCTRL.getLoginPage)

//获取注册界面
accountRouter.get('/register',accountCTRL.getRegisterPage)

accountRouter.post('/register',accountCTRL.register)

//获取图片验证码
accountRouter.get('/vcode',accountCTRL.getVcodeImage)

//处理登录
accountRouter.post('/login',accountCTRL.login)

//4. 导出
module.exports = accountRouter