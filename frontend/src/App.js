// src/App.js
import React, { useState } from 'react'; // Import useState
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // Import Checkout
import axios from 'axios'; // Import axios

function App() {
  const [receipt, setReceipt] = useState(null); // State to hold the receipt for the modal

  const handleCheckout = async (customerInfo) => {
    try {
      const response = await axios.post('http://localhost:5001/api/checkout');
      // The backend gives us the receipt, let's show it
      setReceipt(response.data);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const closeReceipt = () => {
    setReceipt(null);
    window.location.reload(); // Reload to refresh the cart state from the provider
  }

  return (
    <div className="App">
      <h1>Vibe Commerce</h1>
      <div className="main-layout">
        <ProductList />
        <div>
          <Cart />
          <Checkout onCheckoutSuccess={handleCheckout} />
        </div>
      </div>

      {/* The Receipt Modal */}
      {receipt && (
        <div className="modal">
          <div className="modal-content">
            <h2>Checkout Successful!</h2>
            <p><strong>Total:</strong> ${receipt.total.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(receipt.checkoutTimestamp).toLocaleString()}</p>
            <h3>Items:</h3>
            <ul>
              {receipt.items.map(item => (
                <li key={item.id}>{item.name} (x{item.quantity})</li>
              ))}
            </ul>
            <button onClick={closeReceipt}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;