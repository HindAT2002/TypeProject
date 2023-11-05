
// controllers/typeController.js
const { Type } = require('../models/Types');

const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find();
    res.json(types);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
const create = async (req, res) => {
  const typeData = req.body;
  console.log('Received data:', typeData); // Log the received data

  try {
    console.log('Type model:', Type); // Add this line to log Type
    const type = await Type.create(typeData);
    res.status(201).json(type);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données:', error);
    res.status(500).send('Erreur serveur lors de la création du produit');
  }
}



module.exports={ 
    getAllTypes,
    create
    }