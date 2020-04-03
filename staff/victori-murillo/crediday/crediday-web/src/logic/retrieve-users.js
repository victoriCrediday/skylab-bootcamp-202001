const { validate, fetch, handleError } = require('crediday-utils')
const API_URL = process.env.REACT_APP_API_URL

/**
 * @function Function to retrieve users by company
 * @param  {string} string token
 * @throws {Error} if someone is wrong in the response
 * @return {Promise}
 */

module.exports = token => {
  validate.string(token, 'token')

  return (async () => {
    const response = await fetch.get(`${API_URL}/users-companies`, { token })
    return await handleError(response)
  })()
}