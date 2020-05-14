const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    notes: { type: Array, required: true },
    creationDate: { type: Date, required: false },
    modificationDate: { type: Date, required: false }
})

module.exports = mongoose.model('Note', notesSchema);