const errorHandler = (error, req, res, next) => {
    console.log(error);

    const defaultError = {
        statusCode: error.statusCode || 500,
        msg: error.message || 'something went wrong, try again later'
    }
    if (error.name === 'ValidationError') {
        defaultError.statusCode = 400
        defaultError.msg = Object.values(error.errors).map((item) => item.message).join(',');
    }
    if (error.code && error.code === 11000) {
        defaultError.statusCode = 400
        defaultError.msg = `${Object.keys(error.keyValue)} field has to be unique`
    }
    if (error.name === 'CastError') {
        defaultError.statusCode = 404
        defaultError.msg = `no job with id : ${error.value}`
    }

    if (error.name === "MongooseError") {
        defaultError.statusCode = 400;
        defaultError.msg = error.message;
    }

    res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}
export default errorHandler