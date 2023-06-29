const express = require('express');
const Notes = require('../models/Note');
const User = require('../models/User');
const AppError = require('../utils/AppError');


module.exports = {

    // GET USER NOTES AND DISPLAY THEM
    get: async(req, res, next) => {        
        try {                      
            let userId = req.params.userId  ;
            let user = await User.findById(userId).populate('notes');
            // Check that user with given ID exists
            if(await User.findById(userId) != null){
                // if exist render page with associated notes
                let notes = user.notes;
                res.render('home', {notes, userId});                
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
            let {title, content} = req.body;
            let userId = req.params.userId;

            // Find associated user
            let user = await User.findById(req.params.userId);
    
            // Add the new Note to note collection
            let newNote = await new Notes({
                title: title,
                content: content,
                userID: userId
            }).save();

            // Add the new not to the user
            user.notes.push(newNote);
            await user.save();

            res.redirect(`/${userId}/notes`)    
        } catch (error) {
            next(new AppError(400, 'Missing Request Body, Note Need to at least have content'));
        }    
    },


    // TODO - ALLOW USERS TO DELETE NOTES
    delete: async(req, res, next) => {
        try {
            await Notes.findByIdAndDelete(req.params.noteId);
            res.redirect('/notes')
        } catch (error) {
            next(new AppError(404, 'Could not find note to delete with the given ID'));
        }
    },


    // TODO - ALLOW USER TO MODIFY EXISTING NOTES
    put: async(req, res, next) => {
        try {
            let id = req.params.noteId;        
            let {new_note_title, new_note_content} = req.body;
            await Notes.findByIdAndUpdate(id, {$set: {title: new_note_title, content: new_note_content}}, {runValidators: true});
            res.redirect('/notes')
        } catch (error) {
            next(new AppError(404, 'Could not find note to modify with the given ID'));        
        }
    }

    
}