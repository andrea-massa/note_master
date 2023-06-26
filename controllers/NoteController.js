const express = require('express');
const Notes = require('../models/Note');


module.exports = {

    get: async(req, res) => {
        try {
            let notes = await Notes.find({});
            res.render('home', {notes});
        } catch (error) {
            res.send(error);
        }   
    },

    post: async(req, res) => {
        try {
            let {title, content} = req.body;
            await new Notes({title, content}).save();
            res.redirect('/notes')    
        } catch (error) {
            res.send(error);   
        }    
    },

    delete: async(req, res) => {
        try {
            await Notes.findByIdAndDelete(req.params.noteId);
            res.redirect('/notes')
        } catch (error) {
            res.send(error)
        }
    },

    put: async(req, res) => {
        try {
            let id = req.params.noteId;        
            let {new_note_title, new_note_content} = req.body;
            await Notes.findByIdAndUpdate(id, {title: new_note_title, content: new_note_content});
            res.redirect('/notes')
        } catch (error) {
            res.send(error)
        }
    }
    
}