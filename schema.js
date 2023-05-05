const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    civility : {
        type: String,
        required:true,
    },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: String,
    required:true,
  },
  country: {
    type: String,
    required: true,
  },
  phone:{
    type: Number,
    required:true,
  },

});

module.exports = mongoose.model('User', userSchema);