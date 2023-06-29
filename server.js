// IMPORTS
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
const AppError = require('./utils/AppError');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const noteRouter = require('./routers/NoteRouter');
const userRouter = require('./routers/UserRouter');


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

// Route configurations
server.use('/', userRouter)
server.use('/:userId/notes', noteRouter);



server.use((req, res, next) => {
    next(new AppError(404, 'Page Not Found'));    
})
server.use(errorHandler);

// STARTING SERVER
server.listen(3000, () => {
    console.log('SERVER LISTENING ON PORT 3000')
})