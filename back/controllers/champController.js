const mongoose = require('mongoose');

// controllers/champController.js
const { Champ } = require('../models/Champ');
const {Type} =require('../models/Types');

const getAllChamps = async (req, res) => {
  try {
    const champs = await Champ.find();
    res.json(champs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
const create = async (req, res) => {
  const champData = req.body; // Assuming champData is an array of objects
  console.log('Received data:', champData);

  try {
    // Créez un nouveau type
    const { nom, description, champs } = req.body;
    const newType = new Type({ nom, description });

    // Enregistrez le nouveau type dans la base de données
    const savedType = await newType.save();

    // Créez des champs associés au type
    const champPromises = champs.map(async (champData) => {
      const { name, nature } = champData;
      const newChamp = new Champ({ name, nature, typeId: savedType._id }); // Associez le champ au type nouvellement créé
      await newChamp.save();
    });

    // Attendez que toutes les opérations de création de champs se terminent
    await Promise.all(champPromises);

    res.status(201).json({ message: 'Type et champs créés avec succès', savedType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est produite lors de la création du type et des champs.' });
  }
};
  
// const getChampsById=async(req,res)=>{
//   try {
//     const typeId = req.params.typeId;
//     console.log(typeId);

//     if (!mongoose.Types.ObjectId.isValid(typeId)) {
//       console.log('id pas valid')
//       return res.status(400).json({ message: 'ID de type non valide' });
      
//     }
//     // Recherchez le type par ID
//     const type = await Type.findById(typeId);

//     if (!type) {
//       return res.status(404).json({ message: 'Type non trouvé' });
//     }

//     // Recherchez les champs associés à ce type
//     const champs = await Champ.find({ type: typeId });

//     res.status(200).json({ type, champs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Une erreur est produite lors de la récupération des champs.' });
//   }
// };
const getChampsByName = async (req, res) => {
  try {
    const typeName = req.params.typeName; // Modifiez le paramètre pour accepter le nom du type
    console.log(typeName);

    // Recherchez le type par son nom
    const type = await Type.findOne({ nom: typeName });

    if (!type) {
      return res.status(404).json({ message: 'Type non trouvé' });
    }

    // Recherchez les champs associés à ce type
    const champs = await Champ.find({ typeId: type._id });
     console.log(champs);
    res.status(200).json({champs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est produite lors de la récupération des champs.' });
  }
};


module.exports = {
  getAllChamps,create,getChampsByName
};
