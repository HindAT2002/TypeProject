const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du modèle Type
const typeSchema = new Schema({
  nom: String,
  description: String,
  champs: [{ type: Schema.Types.ObjectId, ref: 'Champ' }]
});

const Type = mongoose.model('Type', typeSchema);
module.exports=Type;
module.exports = {
  Type,
};