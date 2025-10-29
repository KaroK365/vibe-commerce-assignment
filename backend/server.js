const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5001

// Mock product data
const products = [
  { id: 1, name: 'Eco-Friendly Water Bottle', price: 15.00 },
  { id: 2, name: 'Organic Cotton T-Shirt', price: 25.00 },
  { id: 3, name: 'Recycled Paper Notebook', price: 5.50 },
  { id: 4, name: 'Bamboo Toothbrush Set', price: 8.00 },
  { id: 5, name: 'Soy Wax Candle', price: 12.00 },
];

// In-memory cart
let cart = [];

app.use(cors())
app.use(express.json())

//Test Route
app.get('/', (req, res) =>{
    res.json({
        message: 'Backend server is running!'
    });
});

//API endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
})

//GET current cart
app.get('/api/cart', (req,res) =>{
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ items: cart, total });
})

//ADD item to cart
app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is already in the cart
    const existingItem = cart.find(item => item.id === parseInt(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity: quantity });
    }

    res.status(201).json(cart);
});

//Remove an item from the cart
app.delete('/api/cart/:productId', (req, res) => {
    const { productId } = req.params;
    cart = cart.filter(item => item.id !== parseInt(productId));
    res.json(cart);
  });

// Checkout and create a mock receipt
app.post('/api/checkout', (req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ message: 'Cannot checkout with an empty cart.' });
  }

  // Calculate final total on the server
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Create the mock receipt
  const receipt = {
    items: [...cart], // Create a copy of the cart items for the receipt
    total: total,
    checkoutTimestamp: new Date().toISOString()
  };

  // Clear the cart after checkout
  cart = [];

  res.json(receipt);
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});