const express = require('express');
const ejs = require('ejs');

const server = express();


server.listen(3000, () => {
    console.log('SERVER LISTENING ON PORT 3000')
})

server.get('/', (req, res) => {
    res.send('Working');
})