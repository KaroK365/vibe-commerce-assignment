// src/components/Checkout.js
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = ({ onCheckoutSuccess }) => {
  const { cart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // We'll call a function passed down via props
    onCheckoutSuccess({ name, email });
  };

  return (
    <div className="checkout-form">
      <h3>Checkout</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={cart.items.length === 0}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;