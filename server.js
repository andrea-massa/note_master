// IMPORTS
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const AppError = require('./utils/AppError');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const noteRouter = require('./routers/NoteRouter');

//DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/noteMaster?directConnection=true')
    .then(() => {console.log('Connection to DB was sucessful')})
    .catch((e) => {console.log('Error Connecting to DB:\n' + e)})


// SERVER CONFIGURATIONS
const server = express();
server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(methodOverride('_method'));
server.use(requestLogger);
server.use('/notes', noteRouter);
server.use((req, res, next) => {
    next(new AppError(404, 'Page Not Found'));    
})
server.use(errorHandler);

// STARTING SERVER
server.listen(3000, () => {
    console.log('SERVER LISTENING ON PORT 3000')
})