
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [typeCharacteristics, setTypeCharacteristics] = useState([]);
  const [product, setProduct] = useState({
    nom: "",
    typeId: "",
    image:null,
    characteristics: [], // Store characteristics as an array of objects
  });
  const navigate=useNavigate(); 
  

  useEffect(() => {
    fetch("http://localhost:8080/types")
      .then((response) => response.json())
      .then((data) => setTypes(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetch(`http://localhost:8080/champsById/${selectedType}`)
        .then((response) => response.json())
        .then((data) => setTypeCharacteristics(data.champs))
        .catch((error) => console.error(error));
    } else {
      setTypeCharacteristics([]);
    }
  }, [selectedType]);

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setProduct((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleCharacteristicChange = (event) => {
    const {name,value,image, dataset } = event.target;

    const updatedCharacteristics = [...product.characteristics];
    const idChamp = dataset.idchamp;

    const existingCharacteristic = updatedCharacteristics.find(
      (ch) => ch.idChamp === idChamp
    );

    if (existingCharacteristic) {
      existingCharacteristic["valeur"] = value;
    } else {
      updatedCharacteristics.push({
        idChamp: idChamp,
        nomChamp: name,
        valeur: value,
        
      });
    }

    setProduct({
      ...product,
      characteristics: updatedCharacteristics,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('image', product.image);
    formDataToSend.append('nom', product.nom);
    formDataToSend.append('typeId', product.typeId);
  
    // Append each characteristic individually
    product.characteristics.forEach((char) => {
      formDataToSend.append(`champs[${char.idChamp}][nomChamp]`, char.nomChamp);
      formDataToSend.append(`champs[${char.idChamp}][valeur]`, char.valeur);
    });
  
    // Send productData to the server using the fetch request
    fetch("http://localhost:8080/products", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response
        console.log("Réponse du serveur :", data);
        navigate('/products');
      })
      .catch((error) => console.error(error));
  };
  
  return (
    
    <div className='container'>
    <div className="App">
    <div className="centered-component">
      <div className="component">
        <div className="type">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
            <div className="Type">Créer un nouveau produit</div>
            <div>
              <label>Choisir le type de produit:</label>
              <select
                name="typeId"
                value={product.typeId}
                onChange={(e) => {
                  const selectedTypeId = e.target.value;
                  setProduct({
                    ...product,
                    typeId: selectedTypeId,
                    characteristics: [],
                  });
                  setSelectedType(selectedTypeId);
                }}
              >
                <option value="">Sélectionnez le type</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.nom}
                  </option>
                ))}
                <option className="addType">Ajouter un type</option>
              </select>
            </div>
            {typeCharacteristics.length > 0 && (
              <div>
                <h3>Caractéristiques du type de produit</h3>
                <label className="custom-label">Nom de produit:</label>
                <input
                  type="text"
                  name="nom"
                  value={product.nom}
                  onChange={(e) =>
                    setProduct({ ...product, nom: e.target.value })
                  }
                />

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {typeCharacteristics.map((characteristic) => (
                  <div key={characteristic._id}>
                    <label
                      htmlFor={characteristic.name}
                      className="custom-label"
                    >
                      {characteristic.name} :
                    </label>
                    <br />
                    {characteristic.nature === "number" ? (
                      <input
                        type="number"
                        name={characteristic.name}
                        data-idchamp={characteristic._id}
                        value={getValueForCharacteristic(
                          characteristic._id,
                          characteristic.name
                        )}
                        onChange={handleCharacteristicChange}
                      />
                    ) : characteristic.nature === "date" ? (
                      <input
                        type="date"
                        name={characteristic.name}
                        data-idchamp={characteristic._id}
                        value={getValueForCharacteristic(
                          characteristic._id,
                          characteristic.name
                        )}
                        onChange={handleCharacteristicChange}
                      />
                    ) : (
                      <input
                        type="text"
                        name={characteristic.name}
                        data-idchamp={characteristic._id}
                        value={getValueForCharacteristic(
                          characteristic._id,
                          characteristic.name
                        )}
                        onChange={handleCharacteristicChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            <br />
            <button type="submit">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );

  // Utility function to get the value for a characteristic based on its ID and name
  function getValueForCharacteristic(idChamp, name) {
    const characteristic = product.characteristics.find(ch => ch.idChamp === idChamp);
    return characteristic ? characteristic[name] : "";
  }
};

export default CreateProduct;