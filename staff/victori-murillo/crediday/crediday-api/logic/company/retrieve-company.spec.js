require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, Company, User, mongoose: { Mongoose: { prototype: { CastError } } } } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const retrieveCompany = require('./retrieve-company')

describe('retrieveCompany', () => {
  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
  })

  let companyName, username, company

  beforeEach(async () => {
    companyName = (`companyname${random()}`).slice(0, 19)
    username = (`username${random()}`).slice(0, 29)

    company = await Company.create({ name: companyName })
  })


  it('should return the company', () => {

    return retrieveCompany(company.id)
      .then(_company => {
        expect(_company).to.be.an('object')
        expect(_company.id).to.equal(company.id)
        expect(_company.name).to.equal(companyName);
      })
  })

  it('should fail with wrong syntax company id', () => {
    const randomCompanyId = `${random()}`

    return retrieveCompany(randomCompanyId)
      .then(_company => { throw new Error('should now reach this point') })
      .catch(error => {
        expect(error).to.instanceOf(CastError)
        expect(error.message).to.equal(`Cast to ObjectId failed for value "${randomCompanyId}" at path "_id" for model "Company"`)
      })
  })

  after(async () => {
    await Promise.all([Company.deleteMany(), User.deleteMany()])
    await mongoose.disconnect()
  })
})