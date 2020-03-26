const { User } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = (userId) => {
  validate.string(userId, 'userId')

  return (async () => {
    let user = await User.findOne({ _id: userId })
    let users = await User.find({ company: user.company }).sort({ firstName: 1 }).lean()

    if (!users) throw new Error('Something wrong finding users from the company')

    users.forEach(user => {
      user.id = user._id.toString()
      delete user._id
      delete user.password
      delete user.company
    })

    return users
  })()
}