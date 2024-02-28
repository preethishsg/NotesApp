const cors = require("cors")
const express = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes")
const { config } = require("./config/config")
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/note",noteRouter)

//API's
app.get('/', (req, res) => {
    res.send({
        message: "API woorking now"
    })
  
})

app.listen(config.PORT, async() => {
    try {
        await connection
        console.log('Database Connected Succsssfully...')
    } catch (error) {
        console.log(error)
    }

    console.log(`Example app listening on port http://localhost:${config.PORT}`)
  })