const { StatusCodes } = require("http-status-codes");

class ServiceError extends Error {
    constructor(message = "Something went wrong!", explantion = "Service layer error", statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = "ServiceError";
        this.message = message;
        this.explantion = explantion;
        this.statusCode = statusCode;
    }
}

module.exports = ServiceError;
