const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'fashion@Factory'

//create a user ||method:POST

router.post('/createuser',[
    // check validation here...
    body('email','Enter valid email').isEmail(),
    body('password','The password should be at least 8 characters long.The password should contain at least one uppercase letter, one lowercase letter, and one number, and one symbol.').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,})
], async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        const errorMsg = error.array().map((error)=>{
            return error.msg
        })
        return res.status(400).json({status:false,message: errorMsg[0]})
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt)
    try{
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({status:false,message:"Sorry email is already exists"})
        }

        user = await User.create({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }

        const jwtData = jwt.sign(data,JWT_SECRET)
        return res.json({status:true,data:jwtData,message:'Register successfully'})
       
    }catch(error){
        console.log(error.message)
        return res.status(500).send({status:false,message:'Internal Server Error'})
    }
})

//user login ||method:POST

router.post('/login',[
    // check validation here...
    body('email','Enter a valid email').isEmail(),
    body('password','Password can not be blank').exists(),
],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors.array().map((error)=>{
            return error.msg
        })
        return res.status(400).json({status:false,message: errorMsg[0]})
    };
    try{
        let user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({status:false,message:"Invalid Credentials"})
        }
        let passwordCompare = await bcrypt.compare(req.body.password, user.password)
        if(!passwordCompare){
            return res.status(400).json({status:false,message:"Invalid Credentials"})
        }
        data = {
            user:{
                id:user.id
            }
        }
        const jwtData = jwt.sign(data,JWT_SECRET)
        success = true
        return res.json({status:true,data:jwtData,message:"login succesfully"})
    }
    catch(error){
        console.log(error.message)
        res.status(500).send({status:false,message:'Internal Server Error'})
    }
})

module.exports=router