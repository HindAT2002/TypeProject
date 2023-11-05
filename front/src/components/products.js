import React, { useState, useEffect } from "react";
import "./createType";
import "./Product.css";
import "./poductboot.min.css"

// Import your external CSS files
const Products = () => {
  const [products, setProducts] = useState([]);
  const [Types, setTypes] = useState([]);
  const [selectedType, setselectedType] = useState("");

  // Assuming you fetch the products from an API endpoint
  
  useEffect(() => {
    if (selectedType) {
      fetch(`http://localhost:8080/champsById/${selectedType}`)
        .then((response) => response.json())
        .then((data) => {
          fetch("http://localhost:8080/products")
            .then((response) => response.json())
            .then((data) => {
              setProducts(data);
              console.log(data);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    } else {
      fetch("http://localhost:8080/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedType]); // Include selectedType as a dependency

  // Function to sort products by type
  const sortByType = () => {
    const sortedProducts = [...products].sort((a, b) => {
      // Assuming each product has a "type" property
      const typeA = a.type ? a.type.nom.toLowerCase() : "";
      const typeB = b.type ? b.type.nom.toLowerCase() : "";

      if (typeA < typeB) return -1;
      if (typeA > typeB) return 1;
      return 0;
    });

    setProducts(sortedProducts);
  };

  return (
    <div className="main-banner" id="top">
      <div className="container-fluid">
        <div className="title"><h1>Products </h1></div>
        <div className="row">
          <div className="col-lg-12">
            <div className="right-content">
              <div className="row">
                {products.map((product) => {
                  const mimeType = "image/*";
                  const buffer = product.image.data;
                  const uint8Array = new Uint8Array(buffer);
                  const b64 = btoa(String.fromCharCode.apply(null, uint8Array));
                  return (
                    <div className="col-lg-3" key={product._id}>
                      <div className="right-first-image">
                        <div className="thumb">
                          <div className="inner-content2">
                            <h4>{product.nom || "N/A"} </h4>
                            <span>{product.type ? product.type.nom : "N/A"}</span>
                          </div>
                          <div className="hover-content">
                            <div className="inner">
                              <h4>{product.nom || "N/A"}</h4>
                              <p><strong>Type:</strong> {product.type ? product.type.nom : "N/A"}</p>
                              
                                {product.champs.map((champ) => (
                                  <p><strong>{champ.nomChamp}:</strong> {champ.valeur || "N/A"}
                                  </p>
                                    
                                ))}
                            </div>
                          </div>
                          <img src={`data:${mimeType};base64,${b64}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Products;
