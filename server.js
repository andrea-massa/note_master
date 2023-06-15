const express = require('express');
const ejs = require('ejs');


const server = express();
server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
    console.log('SERVER LISTENING ON PORT 3000')
})





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

server.get('/', (req, res) => {
    res.render('home', {notes});
})