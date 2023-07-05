module.exports = (req, res, next) => {
    // If user data is stored in session, then they are authenticated
    try{
        if(req.session.user._id == req.params.userId){        
            next();
        }
        else{
            res.redirect('/login');
        }
    }
    catch{
        res.redirect('/login');
    }
}