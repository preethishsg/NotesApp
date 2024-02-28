const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
    name: { type: String, requred: true},
    email: { type: String, requred: true, unique : true},
    password: { type: String, requred: true },
    // hash: String,
    // salt: String,
}, 
{
    versionKey: false,
},
{ 
    timestamps: true, 
});

const UserModel = mongoose.model("users", UserSchema)

module.exports = {
    UserModel,
}