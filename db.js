var mongoose = require('mongoose');

const uri = "mongodb+srv://tlykov:root23@cluster372.g5gslr3.mongodb.net/cmpt372?retryWrites=true&w=majority";
mongoose.connect(uri);

var db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));

var Schema = mongoose.Schema;
var noteSchema = new Schema({
    title: {type: String},
    text: {type: String},
    last_modified: {type: Date}
});

var Note = mongoose.model("Note", noteSchema);

const getAll = async() => {
    var notes = await Note.find({}).catch((err)=>{
        console.log(err);
        return null;
    });;

    console.log(notes);
    return notes;
};

module.exports = {
    getAll
};