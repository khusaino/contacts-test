const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  conatcts: [{type: Types.ObjectId, ref: 'Contact'}]
})

module.exports = model('User', schema)