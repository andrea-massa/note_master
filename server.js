// IMPORTS
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');



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



// TEMPORARY CONTAINER FOR NOTES WILL BE REPLACED BY DATABASE
const notes = [
    {
        title: 'Workout',
        content: 'Push Workout',             
    },
    {
        title: 'Recipes',
        content: 'This is a veriety of recipes',             
    },
]



// ROUTES

// Get route for homepage which displays all the notes
server.get('/', (req, res) => {
    res.render('home', {notes});
})

// Post route for a note which creates a new note
server.post('/note', (req, res) => {
    let {title, content} = req.body;
    notes.push({title, content})
    res.redirect('/')
})

// Delete Route for a note which deletes a given note
server.delete('/note', (req, res) => {
    res.send('NOTE DELETE ROUTE HIT')
})

// Put Route for a note which Modifies a given note
server.put('/note', (res, req) => {
    res.send('NOTE PUT ROUTE HIT')
})