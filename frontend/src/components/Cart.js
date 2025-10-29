// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  // Get the new function from the context
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <span>{item.name} (x{item.quantity})</span>
                <br />
                <small>${(item.price * item.quantity).toFixed(2)}</small>
              </div>
              {/* ADD THE REMOVE BUTTON */}
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                &times; {/* This is a nice 'X' icon */}
              </button>
            </div>
          ))}
          <hr />
          <div className="cart-total">
            <strong>Total:</strong>
            <strong>${cart.total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;