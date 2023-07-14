const express = require('express');
const controller = require('../controllers/UserController.js');

//Define the router
const router = express.Router({mergeParams: true});

// Route which renders the login form
router.get('/', (req, res)=>{res.redirect('login')});
router.get('/login', controller.loginForm);

// Route which logs a user in
router.post('/login', controller.login);

// Route which renders the register form
router.get('/register', controller.registerForm);

// Route which registers a new user
router.post('/register', controller.register);

// Router that logs out the user
router.get('/logout', controller.logout)

//Export the router
module.exports = router