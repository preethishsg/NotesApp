const jwt = require("jsonwebtoken")
const { config } = require("../config/config")

function authenticator (req, res, next) {
const token = req.headers.authorization
    jwt.verify(token, config.JWT_SECRET, (err, decode) => {
        if (decode) {
            req.body.user= decode.userId
            next()
        }else{
            res.send({
                message: err.message,
                status: 2
            })
        }
    })

}

module.exports ={
    authenticator,
}