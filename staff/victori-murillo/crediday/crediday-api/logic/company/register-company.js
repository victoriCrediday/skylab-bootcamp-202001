const { Company, User } = require('../../models')
const validate = require('../../utils/validate')
const { hash } = require('bcryptjs')
const { env: { PASSWORD } } = process

module.exports = async (data) => {
  const { company, user } = data

  validate.string(company.name, 'name')
  validate.length(company.name, 3, 30)
  validate.string(user.username, 'username')
  validate.length(user.username, 3, 30)

  // console.log(typeof PASSWORD, PASSWORD);


  const companyFound = await Company.findOne({ name: company.name.toLowerCase() })
  if (companyFound) throw new Error('The company name is already taken')

  const userFound = await User.findOne({ username: user.username.toLowerCase() })
  if (userFound) throw new Error('The username is already taken')

  const newCompany = await Company.create(company)

  const newUser = await User.create({
    username: user.username,
    firstName: user.username,
    company: newCompany.id,
    role: 'admin',
    password: await hash(PASSWORD, 10)
  })

  newCompany.users.push(newUser)
  await newCompany.save()
}