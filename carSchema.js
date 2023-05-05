const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    carburant : {
        type: String,
        required:true,
    },
  carName: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
    unique: true,
  },
   kilometrage: {
    type: Number,
    required: true,
  },
  coleur : String,
  etat: {
    type: String,
    required: true,
  },
  phone:{
    type: Number,
    required:true,
  },

  cylindre: {
    type: Number,
    required: true,
  },
  Image: mongoose.Schema.Types.Mixed

});

module.exports = mongoose.model('car', carSchema);