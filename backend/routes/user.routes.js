const express = require("express")
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const { config } = require("../config/config")

userRouter.get("/", async(req,res) =>{
    res.send({
        message: "All the users"
    })
})

userRouter.post("/login", async(req, res)=>{ 
    const {email,password} = req.body
    try {
        let data = await UserModel.find({email})
        if (data.length>0) {
            let token = jwt.sign ({userId:data[0].id}, config.JWT_SECRET, {expiresIn:"5m"})  
            bcrypt.compare (password, data[0].password, function(err, result){
                if(err) return res.send({message: "Somthing went wrong: "+err, status: 0})
                if(result){
                    res.send({
                        message: "User logged in successfully",
                        token: token,
                        status: 1
                    }) 
                }else{
                    res.send({
                        message: "Incorrect password",
                        status: 0
                    })
                }
            });
        }else{
            res.send({
                message: "User not found!",
                status: 0
            })
        }
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})

userRouter.post('/register', async(req, res) => {

    const { name, password } = req.body
    const email = req.body.email.toLowerCase();
    //npm bcrypt
    bcrypt.hash(password, 9, async function(err, hash) {
        if(err) return res.send({
            message: err.message, 
            status: 0
        })
        try {
            let user = new UserModel({name, email, password:hash})
            await user.save()
            res.send({
                message: "User created",
                status: 1,
            })
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
    })

})

module.exports = {
    userRouter,
}