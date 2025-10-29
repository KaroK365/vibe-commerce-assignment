// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]); // Start with an empty array
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch products from your backend API
    axios.get('http://localhost:5001/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []); // The empty array [] means this effect runs only once when the component mounts

  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            {/* Call addToCart when the button is clicked */}
            <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;