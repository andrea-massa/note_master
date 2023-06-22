const mongoose = require('mongoose');

// Note Schema and model
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('note', noteSchema);