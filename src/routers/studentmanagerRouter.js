const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

//导入studentmanagerController

const studentmanagerCTRL = require(path.join(__dirname,'../controllers/studentmanagerController.js'))

studentManagerRouter.get('/list',studentmanagerCTRL.getstudentmanagerPage)

module.exports = studentManagerRouter