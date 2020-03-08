const { Router } = require('express')
const router = Router()

const bodyParser = require('body-parser').json()
const { errorHandler, status, jwtVerify, validateRole } = require('../middleware')
const { company, user, credit } = require('./handlers')

module.exports = router
  .use(bodyParser)
  .use(status)

  .post('/companies', company.register)
  .post('/users/auth', user.authenticate)

  .use(jwtVerify)

  .get('/companies/:id', company.retrieve)
  .get('/companies', validateRole, company.retrieveAll)
  // .patch('/companies/:id', company.update)
  // .delete('/companies/:id', company.delete)

  .post('/users', user.register)
  .get('/users/:id', user.authenticate)
  // .get('/users/companies/:id', user.retrieveAll)
  // .patch('/users/:id', user.update)
  // .patch('/users/:id', user.delete)

  .post('/credits', credit.register)


  .use(errorHandler)
