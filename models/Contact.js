const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  firstName: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true},
  owner: {type: String, required: true},
})

module.exports = model('Contact', schema)