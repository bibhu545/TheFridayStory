exports.API_AUTH_SECRET = "veryStrongPassword@2020"
exports.ERROR_MESSAGE = "Some internal error occured. Please try again."

exports.ArticleStatus = {
    Deleted: 0,
    Active: 1,
    UnderReview: 2
}

exports.errorMessage = (res, statusCode = 500, message = "", data = {}) => {
    console.log(data)
    return res.status(statusCode).json({
        message: message,
        data: data
    })
}