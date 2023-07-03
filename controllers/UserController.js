const express = require('express');
const User = require('../models/User');
const AppError = require('../utils/AppError');



module.exports = {
    loginForm: (req, res, next) => {
        res.render('login');
    },


    registerForm: (req, res, next) => {
        res.render('register');
    },


    login: async(req, res, next) => {     
        try {
            // Save username and password from front end
            let logUsername = req.body.login_username;
            let logPassword = req.body.login_password;

            //Check if username exist in DB
            let user = await User.findOne({username: logUsername})
            if(user != null){

                //Check if password matches username
                if(user.password === logPassword){
                    // Store user data in session
                    req.session.user = user;                    
                    res.redirect(`${user._id}/notes`);
                }else{
                    next(new AppError(401, 'Wrong Password'))
                }   

            }else{
                next(new AppError(401, 'No Such Username Found'))
            }
        }
        catch(error){
            next(new AppError(401, "Authentication Failed"))
        }
    },

    
    // LOGS OUT THE CURRENT USER
    logout: async(req, res, next) => {
        // TODO
        req.session.destroy();
        res.redirect('/login');
    },


    register: async(req, res, next) => {   
        try {
            // Save username and password from front end
            let regUsername = req.body.register_username;
            let regPassword = req.body.register_password;
            
            // Make sure that the username is not already in use
            if(await(User.findOne({username: regUsername})) != null){
                next(new AppError(409, 'Error Registering, Username already in Use'));
            }

            //Save new user to db
            let user = await new User({
                username : regUsername,
                password: regPassword
            }).save()         
            
            // Redirect user to its personalized homepage
            res.redirect('login');
        } catch (error) {
            next(new AppError(400, "Error Registering, Missing Data"))
        }
    }

}