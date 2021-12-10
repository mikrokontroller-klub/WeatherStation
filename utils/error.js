class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    if (err instanceof Error) {
        const { statusCode, message } = err;
        //TODO: Render error page
        res.status(statusCode ?? 500).send(message ?? err);
    }
};

module.exports = {
    ErrorHandler,
    handleError,
};
