
module.exports.createResponder = function (res) {
  const success = (data) => {
    return res.status(200).json({
      success: true,
      data: data
    })
  }

  const failure = (statusCode = 500, message = 'Server Error') => {
    return res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode,
        message: message
      }
    })
  }

  const unauthorized = () => {
    return failure(401, 'Unauthorized')
  }

  const error = ({ response = {} } = {}) => {
    return failure(response.statusCode, response.statusText)
  }

  return {
    unauthorized,
    error,
    success,
    failure
  }
}
