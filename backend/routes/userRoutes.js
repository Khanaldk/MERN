const express=require('express');
const userControllers = require('../controllers/userController');
const userRoutes=express.Router();

userRoutes.post('/create',userControllers.createUser)

module.exports=userRoutes