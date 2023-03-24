var mongoose = require('mongoose');

const uri = "mongodb+srv://tlykov:root23@cluster372.g5gslr3.mongodb.net/cmpt372?retryWrites=true&w=majority";
mongoose.connect(uri);

var db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));

var Schema = mongoose.Schema;
var noteSchema = new Schema({
    title: {type: String},
    text: {type: String},
    tag: {type: String},
    last_modified: {type: Date}
});

var Note = mongoose.model("Note", noteSchema);

const getAll = async() => {
    var notes = await Note.find({}).catch((err)=>{
        console.log(err);
        return null;
    });

    return notes;
};

const addNote = async(note) => {
    var newNote = new Note({
        title: note.title,
        text: note.text,
        tag: note.tag,
        last_modified: note.last_modified
    });

    const exists = await Note.findOne(newNote).exec();
    if(exists != null) {
        console.log("Duplicate note, not created");
        return false;
    }

    try {
        await newNote.save();
        console.log("Note created: " + note.title);
    }
    catch(err) {
        console.log(err);
        return false;
    }
    return true;
};

const update = async(note) => {
    var res = await Note.updateOne(
        {title: note.title},
        {text: note.text},
        {tag: note.tag},
        {last_modified: note.last_modified}
    ).catch((err)=>{
        console.log(err);
        return false;
    });

    return true;
};

const remove = async(title) => {
    var res = await Note.deleteOne({title: title})
    .catch((err)=>{
        console.log(err);
        return false;
    });
    
    return true;
};

module.exports = { getAll, addNote, update, remove };