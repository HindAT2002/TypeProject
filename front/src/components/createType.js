import React, { useState } from "react";
import "./createType.css";
import { useNavigate } from "react-router-dom";

function CreateType() {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    champs: [{ name: "", nature: "" }], // champs est un tableau d'objets avec name et type
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addCharacteristic = () => {
    setFormData({
      ...formData,
      champs: [...formData.champs, { name: "", nature: "" }],
    });
  };

  const handleCharacteristicChange = (index, key, value) => {
    const updatedChamps = [...formData.champs];
    updatedChamps[index][key] = value;
    setFormData({
      ...formData,
      champs: updatedChamps,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    const url = "http://localhost:8080/champs";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
     
    })
      .then((response) => {
        if (response.ok) {
          console.log("Données envoyées avec succès !");
          navigate('/createProduct');
        } else {
          console.error("Échec de l'envoi des données.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  return (
    <div className="centered-component">
      <div className="component">
        <div className="type">
          <form onSubmit={handleSubmit} className="form">
            <div className="Type">Create type:</div>
            <br></br>
            <div>
              <label htmlFor="nom">Nom du style:</label>
              <input
                className="input"
                type="text"
                id="nom"
                name="nom" // Utilisez "nom" comme le nom de l'attribut
                value={formData.nom}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Caractéristiques:</label>
              {formData.champs.map((champ, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={champ.name}
                    onChange={(e) =>
                      handleCharacteristicChange(index, "name", e.target.value)
                    }
                    placeholder="Nom de la caractéristique"
                  />
                  <select
                    value={champ.nature}
                    onChange={(e) =>
                      handleCharacteristicChange(index, "nature", e.target.value)
                    }
                  >
                    <option value="">Sélectionner le type</option>
                    <option value="date">Date</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                  </select>
                </div>
              ))}
              <button type="button" onClick={addCharacteristic}>
                +
              </button>
            </div>
            <button type="submit">Ajouter Style</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateType;

