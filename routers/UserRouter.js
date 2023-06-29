const express = require('express');
const controller = require('../controllers/UserController.js');

//Define the router
const router = express.Router({mergeParams: true});


// Route which renders the register form
router.get('/login', controller.loginForm);

// Route which logs a user in
router.post('/login', controller.login);

// Route which renders the log in form
router.get('/register', controller.registerForm);

// Route which registers a new user
router.post('/register', controller.register);



//Export the router
module.exports = router