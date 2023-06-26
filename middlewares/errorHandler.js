module.exports = (err, req, res, next) => {
    console.log(`
    ****************************************************************\n
    \tError\n
    \tStatus: ${err.status}\n
    \tMessage: ${err.message}\n
    ****************************************************************\n
    `)
    console.log(err.stack);
    res.status(err.status);
    res.render('error', {err});
}