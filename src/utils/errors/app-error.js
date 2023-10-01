class AppError extends error {
    constructor(
        name,
        message,
        explanation,
        statusCode
    ) {
        super(message);
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}
module.exports = AppError;