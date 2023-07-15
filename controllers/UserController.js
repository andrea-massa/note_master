const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const AppError = require('../utils/AppError');



module.exports = {
    // RENDERS THE LOGIN FORM
    loginForm: (req, res, next) => {
        res.render('login');
    },


    // RENDERS THE REGISTER FORM
    registerForm: (req, res, next) => {
        res.render('register');
    },


    // HANDLES USER LOGIN REQUEST
    login: async(req, res, next) => {     
        try {
            // Save username and password from front end
            let logUsername = req.body.login_username;
            let logPassword = req.body.login_password;

            //Check if username exist in DB
            let user = await User.findOne({username: logUsername})
            if(user != null){

                //Check if password matches username
                if(await bcrypt.compare(logPassword, user.password)){

                    // Store user data in session
                    req.session.user = user;     
                    user.isLoggedIn = true; 
                    await user.save();              
                    res.redirect(`${user._id}/notes`);
                }else{
                    throw error;
                }   

            }else{
                throw error;
            }
        }
        catch(error){
            next(new AppError(401, "Wrong Username or Password"))
        }
    },

    
    // LOGS OUT THE CURRENT USER THAT SUBMITS THE LOG IN FORM
    logout: async(req, res, next) => { 
        try {
            // Find active user
            let user = await User.findById(req.session.user._id);

            // For debugging make sure user is marked as logged out
            user.isLoggedIn = false;        
            await user.save();

            // Destroy session so that user is officially logged out
            req.session.destroy();        
            res.redirect('/login');
        } catch (error) {
            next (new AppError(401, 'You have been logged out, please log back in'));
        }               
    },


    // REGISTERS A NEW USER THAT SUBMITS THE REGISTER FORM
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
                password: await hashPassword(regPassword) //hash the password
            }).save()         
            
            // Redirect user to its personalized homepage
            res.redirect('login');
        } catch (error) {
            next(new AppError(400, "Error Registering, Missing Data"))
        }
    }
}




// Helper function to hash password
async function hashPassword(plainPassword){  
    const hashedPw = bcrypt.hash(plainPassword, 12);
    return hashedPw
}