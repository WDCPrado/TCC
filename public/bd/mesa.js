const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mesaSchema = new Schema({
  garcom: String,
  nMesa: String
}); 

const Mesa = mongoose.model('Mesa', mesaSchema);

module.exports = Mesa;
