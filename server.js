// IMPORTS
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Notes = require('./models/Note.js');



// SERVER CONFIGURATIONS
const server = express();
server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(methodOverride('_method'));



// STARTING SERVER
server.listen(3000, () => {
    console.log('SERVER LISTENING ON PORT 3000')
})



//DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/noteMaster?directConnection=true')
    .then(() => {console.log('Connection to DB was sucessful')})
    .catch((e) => {console.log('Error Connecting to DB:\n' + e)})



// MIDDLEWARE
server.use((req, res, next) => {
    console.log(`New ${req.method} from ${req.ip} on ${req.path}`);
    next();
})



// ROUTES

// Get route for homepage which displays all the notes
server.get('/', async(req, res) => {
    try {
        let notes = await Notes.find({});
        res.render('home', {notes});
    } catch (error) {
        res.send(error);
    }    
})

// Post route for a note which creates a new note
server.post('/note', async(req, res) => {
    try {
        let {title, content} = req.body;
        await new Notes({title, content}).save();
        res.redirect('/')    
    } catch (error) {
        res.send(error);   
    }    
})

// Delete Route for a note which deletes a given note
server.delete('/note/:noteId', async(req, res) => {
    try {
        await Notes.findByIdAndDelete(req.params.noteId);
        res.redirect('/')
    } catch (error) {
        res.send(error)
    }
})

// Put Route for a note which Modifies a given note
server.put('/note/:noteId', async(req, res) => {
    try {
        let id = req.params.noteId;        
        let {new_note_title, new_note_content} = req.body;
        await Notes.findByIdAndUpdate(id, {title: new_note_title, content: new_note_content});
        res.redirect('/')
    } catch (error) {
        res.send(error)
    }
})