const express = require('express');
const Notes = require('../models/Note');
const AppError = require('../utils/AppError');


module.exports = {

    get: async(req, res, next) => {
        try {
            let notes = await Notes.find({});
            res.render('home', {notes});
        } catch (error) {
            next(new AppError(404, 'Could not find Notes'));
        }   
    },

    post: async(req, res, next) => {
        try {
            let {title, content} = req.body;
            await new Notes({title, content}).save();
            res.redirect('/notes')    
        } catch (error) {
            next(new AppError(400, 'Missing Request Body, Note Need to at least have content'));
        }    
    },

    delete: async(req, res, next) => {
        try {
            await Notes.findByIdAndDelete(req.params.noteId);
            res.redirect('/notes')
        } catch (error) {
            next(new AppError(404, 'Could not find note to delete with the given ID'));
        }
    },

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