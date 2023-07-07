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
    },
    color: {
        type: String,
        // enum: [],
        default: '#fff475',                
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }    
})

module.exports = mongoose.model('Note', noteSchema);