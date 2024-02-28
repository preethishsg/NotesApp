const express = require("express")
const { NoteModel } = require("../models/NoteModel")
const jwt = require("jsonwebtoken")
const { authenticator } = require("../middlewares/auth")
const noteRouter = express.Router()
const { config } = require("../config/config")
noteRouter.use(authenticator)

noteRouter.get("/", (req, res) => {
    const token = req.headers.authorization
    jwt.verify(token, config.JWT_SECRET, async(err, decode)=> {
        // res.send({
        //     message: err.message,
        //     status: 0
        // })
        try {
            let data = await NoteModel.find({user:decode.userId})
            res.send({
                data:data,
                message: "Success",
                status: 1
            })
        } catch (error) {
            res.send({
                message:error.message,
                status:0
            })
        }
    })
})

noteRouter.post("/create", async(req, res) =>{
    try {
        let note = new NoteModel(req.body)
        await note.save()
        res.send({
            message: "Note created",
            status:1
        })
    } catch(error){
        res.send({
            message: error.message,
            status: 0
        })
    }
})

noteRouter.patch("/update", async (req, res) => {
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndUpdate({_id:id}, req.body)
        res.send({
            message: "Note updated",
            status:1
        })
    } catch (error) {
        res.send({   
             message:error.message,
             status: 0
        })
    }
})

noteRouter.delete("/delete", async (req, res) => {
    let {id} = req.headers
    try {
        await NoteModel.findByIdAndDelete({_id:id})
        res.send({
            message: "Note Deleted",
            status:1
        })
    } catch (error) {
        res.send({   
             message:error.message,
             status: 0
        })
    }
})


module.exports = {
    noteRouter,
}
