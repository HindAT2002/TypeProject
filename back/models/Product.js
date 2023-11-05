const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nom: String,
  image: {
    type: Buffer,
    required: false,
  },
  type: { type: Schema.Types.ObjectId, ref: 'Type' },
  champs: [{
    champId: { type: Schema.Types.ObjectId, ref: 'Champ' },
    nomChamp: String,
    valeur: Schema.Types.Mixed,
  }],
});


const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product
};