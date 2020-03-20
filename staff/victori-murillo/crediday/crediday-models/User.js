const { model, Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const schema = new Schema({

  username: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: [3, 'The name must have at least 3 characters'],
    maxlength: [30, 'The name must have max 30 characters'],

    required: [function () {
      return this.role === "customer" ? false : true
    }, `This role must have a password`]
  },

  firstName: {
    type: String,
    required: [true, 'Please add your first name'],
    trim: true,
    minlength: [3, 'The name must have at least 3 characters'],
    maxlength: [30, 'The name must have maximum 30 characters']
  },

  lastName: {
    type: String,
    trim: true,
    minlength: [3, 'The last name must have at least 3 characters'],
    maxlength: [30, 'The last name must have maximum 30 characters']
  },

  role: {
    type: String,
    enum: ["customer", "collector", "admin", "owner", "developer"],
    default: "customer"
  },

  password: {
    type: String,
    required: [function () {
      return this.role === "customer" ? false : true
    }, `This role must have a password`]
  },

  verificationCode: {
    type: 'String',
    trim: true
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
      message: () => `Please add a valid email`
    },
    required: [function () {
      return this.role === "owner" ? true : false
    }, `This role must have an email`]
  },

  authenticatedDates: [{ type: Date }],

  crId: String,

  whatsapp: String,
  mobileNumber: String,
  homeAddress: String,
  workAddress: String,

  // token: String,

  //Datos para Ingresar al Sistema

  permissions: {
    type: Boolean,
    default: true
  },

  configInitialAmount: {
    type: Boolean,
    default: true
  },

  collectorsDontSee: [String],

  created: {
    type: Date,
    default: Date.now
  },

  company: {
    type: ObjectId,
    ref: 'Company',
    required: true
  },

  credits: [{
    type: ObjectId,
    ref: 'Credit'
  }]
  
}, { versionKey: false })

schema.pre('save', function (next) {
  this.firstName = this.firstName.trim()[0].toUpperCase() + this.firstName.trim().slice(1).toLowerCase()

  if (this.lastName) {
    this.lastName = this.lastName.trim()[0].toUpperCase() + this.lastName.trim().slice(1).toLowerCase()
  }

  next()
})

module.exports = model('User', schema)