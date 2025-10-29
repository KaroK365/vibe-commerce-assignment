// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  // Function to fetch the cart from the backend
  const fetchCart = () => {
    axios.get('http://localhost:5001/api/cart')
      .then(response => setCart(response.data))
      .catch(error => console.error('Error fetching cart:', error));
  };

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = (productId, quantity) => {
    axios.post('http://localhost:5001/api/cart', { productId, quantity })
      .then(() => fetchCart()) // Refetch the cart to get the updated state
      .catch(error => console.error('Error adding to cart:', error));
  };

  const removeFromCart = (productId) => {
    axios.delete(`http://localhost:5001/api/cart/${productId}`)
      .then(() => fetchCart()) // Refetch the cart to update the UI
      .catch(error => console.error('Error removing from cart:', error));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};