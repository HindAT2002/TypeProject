// controllers/productController.js
const { Product } = require('../models/Product');
const {Type} =require('../models/Types');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('type champs');
   
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
const createProduct = async (req, res) => {
  const productData = req.body;

  try {
    const type = await Type.findOne({ nom: productData.typeId });

    if (!type) {
      console.log("Type n'existe pas");
      return res.status(404).json({ error: 'Type not found' });
    }

    // Iterate through characteristics and create a new array with the required format
    const formattedChamps = Object.keys(productData.champs).map((champId) => ({
      champId,
      nomChamp: productData.champs[champId].nomChamp,
      valeur: productData.champs[champId].valeur,
    }));

    const newProduct = await Product.create({
      nom: productData.nom,
      type: type._id,
      champs: formattedChamps,
      image: req.file.buffer,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur lors de la création du produit');
  }
};



module.exports = {
  getAllProducts,
  createProduct,
};


