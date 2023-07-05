const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

// Note Schema and model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    isLoggedIn:{
        type: Boolean,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
}, {
    methods: {
        // DELETES A SINGLE USER NOTE GIVEN THE ID
        async deleteNote(noteId) {
            try {                
                await this.updateOne({
                    $pull: {
                        notes: noteId
                    }
                });
            } catch (error) {
                throw new AppError(404, `Error Deleting Note ${noteId} for User ${this._id}`);
            }
        },
        // DELETES A ALL NOTES UNDER THE CURRENT USER
        // TODO
        async deleteAllNotes() {
            try {                
                // Delete all notes under the current users


                //Delete all notes from the given DB given the user ID


            } catch (error) {
                throw new AppError(404, `Error deleting all notes for user ${this._id}`);
            }
        }
    }
})

module.exports = mongoose.model('User', userSchema);