const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const champSchema = new Schema({
  name: String,
  nature:String,
  typeId: { type: Schema.Types.ObjectId, ref: 'Type' },
});

const Champ = mongoose.model('Champ', champSchema);
module.exports = {
  Champ,
};
