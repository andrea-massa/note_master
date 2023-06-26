//Logs the requests made by clients on server
module.exports = (req, res, next) => {
    console.log(`New ${req.method} from ${req.ip} on ${req.path}`);
    next();
}
