const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema ({
    user: { type: String, requred: true },
    title: { type: String, requred: true },
    desc: { type: String, requred: true },
}, 
{
    versionKey: false,
},
{ 
    timestamps: true, 
});

const NoteModel = mongoose.model("notes", NoteSchema)

module.exports = {
    NoteModel,
}