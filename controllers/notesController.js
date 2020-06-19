const Note = require('../models/noteModel');
const { v4: uuidv4 } = require('uuid');

exports.index = function (req, res) {
    // console.log(req.user._id)
    res.send("You are on the notes index page (authorized).")

}

exports.addNote = function (req, res) {

    Note.findOne({ uid: req.user._id }, function (err, doc) {
        if (err) console.log(err);
        const newNote = {
            id: uuidv4(),
            title: req.body.title,
            content: req.body.content
        }
        if (!doc) { res.send({ value: false, msg: "Something went wrong." }); }
        else {
            doc.notes.push(newNote);
            doc.markModified('notes');
            doc.save().then(() => {
                console.log("Note successfully created.")
                res.send({ value: true, msg: "Note created sucessfully.", newItem:newNote});
            });
        }

    });
}

exports.getNotes = function (req, res) {
    Note.findOne({ uid: req.user._id }, function (err, doc) {
        if (err) console.log(err);
        res.send(doc.notes)
    });
}

exports.updateNote = function (req, res) {

    Note.findOne({ uid: req.user._id }, function (err, doc) {
        if (err) console.log(err);
        const noteToUpdate = doc.notes.filter(note => note.id == req.body.noteId);
        const indexToUpdate = doc.notes.indexOf(noteToUpdate[0]);
        if (req.body.title) {
            doc.notes[indexToUpdate].title = req.body.title;
        }
        if (req.body.content) {
            doc.notes[indexToUpdate].content = req.body.content;
        }
        doc.markModified('notes');
        doc.save().then(() => {
            console.log("Note successfully updated.")
            res.redirect('/');
        });
    });
}

exports.deleteNote = function (req, res) {

    Note.findOne({ uid: req.user._id }, function (err, doc) {
        if (err) console.log(err);
        const noteToUpdate = doc.notes.filter(note => note.id == req.body.noteId);
        const indexToDelete = doc.notes.indexOf(noteToUpdate[0]);
        doc.notes.splice(indexToDelete, 1);
        doc.markModified('notes');
        doc.save().then(() => {
            console.log("Note successfully deleted.")
            res.send({value: true, msg:"Note succesfully deleted."});
        });
    });
}