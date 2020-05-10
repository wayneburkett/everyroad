const axios = require('axios')

// this is just getting strava for now, but that might change, so we
// should try to make it reasonably generic, at some point
const BASE_API_URL = 'https://www.strava.com/api/v3/'

/**
 * Creates an object with methods that operate on the given Express
 * Request and Response objects.
 *
 * Requests expect to retrieve JSON.
 *
 * @param {} req an Express Request object
 * @param {} res an Express Response object
 */
const createRequester = function (req, res) {
  /**
   * Retrieves some JSON
   *
   * @param {} path the resource's path
   * @param {} params an optional parameters object
   * @param {} transform an optional function to apply to the response
   *           before returning it. This function has one parameter: the
   *           data on which to operate.
   */
  const get = (path, params, transform) => {
    makeRequest(path, params)
      .then(response => {
        return responder.success((typeof transform === 'function')
          ? transform(response.data)
          : response.data)
      }).catch(error => {
        return responder.error(error)
      })
  }

  const responder = createResponder(res)

  function makeRequest (path, params = {}) {
    console.log(path)
    console.log(params)
    return axios({
      url: BASE_API_URL + path,
      params: params,
      headers: {
        Authorization: 'Bearer ' + req.user.token,
        accept: 'application/json'
      }
    })
  }

  return { get }
}

/**
 * Creates a responder object with methods that operate on the given
 * Response object. These methods send a consistently-formatted JSON
 * object. API methods should always use one of the methods here and
 * never create their own ad hoc responses.
 *
 * @param {} res an Express Response object
 */
const createResponder = function (res) {
  /**
   * Sends an HTTP 200 Success response with the given data.
   *
   * @param {} data
   */
  const success = (data) => {
    return res.status(200).json({
      success: true,
      data: data
    })
  }

  /**
   * Sends an HTTP error response with the given status and message.
   *
   * Defaults to HTTP 500 Server Error.
   *
   * @param {} statusCode
   * @param {} message
   */
  const failure = (statusCode = 500, message = 'Server Error') => {
    return res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode,
        message: message
      }
    })
  }

  /**
   * Sends an HTTP 401 Unauthorized response.
   */
  const unauthorized = () => {
    return failure(401, 'Unauthorized')
  }

  /**
   * Sends an HTTP error response built from the given HTTP error object.
   *
   * @param {} an HTTP error object
   */
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

module.exports = {
  createRequester,
  createResponder
}
