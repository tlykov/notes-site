var mongoose = require('mongoose');

const connect = async () => {
	try { 
	    const options = {
	        useNewUrlParser: true,
	    };
	
	    const connection = await mongoose.connect('mongodb://mongo:27017/', options);
	    if (connection) {
	        console.log("Database Connected");
        }
	} catch (err) {
	    console.log("Error while connecting database:");
	    console.log(err);
	}
};

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

const update = async(prev_note, new_note) => {
    var res = await Note.updateOne(prev_note, new_note)
    .catch((err)=>{
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

module.exports = { getAll, addNote, update, remove, connect };