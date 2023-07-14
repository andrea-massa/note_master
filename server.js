// IMPORTS
const dotenv = require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const AppError = require('./utils/AppError');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const noteRouter = require('./routers/NoteRouter');
const userRouter = require('./routers/UserRouter');



//DATABASE
mongoose.connect(process.env.DB_LOCAL_CONNECTION_URL)
    .then(() => {console.log('Connection to DB was sucessful')})
    .catch((e) => {console.log('Error Connecting to DB:\n' + e)})



//STARTING SERVER
const server = express();
server.listen(3000 || process.env.PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${process.env.port || 3000}`)
})



// SERVER CONFIGURATIONS
server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(methodOverride('_method'));
server.use(requestLogger);

//Session configuration
server.use(
    session({
      secret: process.env.SESSION_SECRET, // Secret key to sign the session ID cookie
      resave: false, // Whether to save the session if unmodified
      saveUninitialized: false, // Whether to save uninitialized sessions
      cookie: { maxAge: 15 * 60 * 1000 }, //15 minutes age for the cookie
      store: MongoStore.create({
        mongoUrl: process.env.DB_LOCAL_CONNECTION_URL       
      })
    })
  );

// Route configurations
server.use('/', userRouter)
server.use('/:userId/notes', noteRouter);

// Error handling configurations
server.use((req, res, next) => {
    next(new AppError(404, 'Page Not Found'));    
})
server.use(errorHandler);
