const express = require('express');
const Notes = require('../models/Note');
const User = require('../models/User');
const AppError = require('../utils/AppError');


module.exports = {

    // GET USER NOTES AND DISPLAY THEM
    get: async(req, res, next) => {        
        try {                      
            // Get user ID and populate notes based on that user ID
            let userId = req.params.userId;
            let user = await User.findById(userId).populate('notes');

            // Check that user with given ID exists
            if(user != null){
                // if exist render page with associated notes
                let notes = user.notes;
                let userData = {
                    userId : user._id ,
                    username: user.username
                }
                res.render('home', {notes, userData});                
            } else{                  
                // if non existent throw error
                next(new AppError(404, `User with ID ${req.params.userId} does not exist`));
            }            
        } catch (error) {
            next(new AppError(404, 'Page does not exist'));
        }   
    },


    //POSTS NEW NOTES
    post: async(req, res, next) => {
        try {                        
            // Get new note fields
            let {title, content, color} = req.body;
            let userId = req.params.userId;

            // Find associated user
            let user = await User.findById(req.params.userId);
    
            // Add the new Note to note collection
            let newNote = await new Notes({
                title: title,
                content: content,
                color: color,
                userID: userId
            }).save();

            // Add the new note to the user
            user.notes.push(newNote);
            await user.save();

            res.redirect(`/${userId}/notes`)    
        } catch (error) {
            next(new AppError(400, 'Missing Request Body, Note Need to at least have content'));
        }    
    },


    //ALLOW USERS TO DELETE NOTES
    delete: async(req, res, next) => {
        try {
            // User Id and Note ID
            let userId = req.params.userId;
            let noteId = req.params.noteId;

            // Delete note from user collection based on note ID            
            let user = await User.findById(userId);
            await user.deleteNote(noteId);

            // Delete note from notes collection based on note ID            
            await Notes.findByIdAndDelete(noteId);                        
                    
            // redirect to user personalized homepage            
            res.redirect(`/${userId}/notes`);
        } catch (error) {
            next(new AppError(404, 'Could not find note to delete with the given ID'));
        }
    },


    // TODO - ALLOW USER TO MODIFY EXISTING NOTES
    put: async(req, res, next) => {
        try {            
            // Get user and note id as well as new note data            
            let userId = req.params.userId;
            let noteId = req.params.noteId;                                
            let {new_note_title, new_note_content, color} = req.body;

            // Update note in note db
            await Notes.findByIdAndUpdate(noteId, {$set: {title: new_note_title, content: new_note_content, color: color}}, {runValidators: true});            
            
            // Redirect user to personalized notes page
            res.redirect(`/${userId}/notes`)
        } catch (error) {
            next(new AppError(404, 'Could not find note to modify with the given ID'));        
        }
    }

    
}