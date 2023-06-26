// App error class which is used to define errors on the Server Side
module.exports = class AppError extends Error{
    constructor(status, message){
        super();
        this.message = message;
        this.status = status;
    }
}