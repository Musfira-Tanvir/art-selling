const express = require('express');
const bodyParser = require('body-parser'); // Middleware for parsing form data
const path = require('path'); // Manage file paths
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const connectDB = require('./db/connection'); // Adjust to the correct path

const Product = require('./models/product'); // Import the Product model
const Item = require('./models/item'); // Import the Item model
const Contact = require('./models/contact'); // Import the Contact model
const CustomOrder = require('./models/customorder'); // Import the CustomOrder model
const User = require('./models/user'); // Import the User model

const app = express();

// Connect to the database
connectDB();

// Session middleware

const session = require('express-session');
const MongoStore = require('connect-mongo');

// Use MongoDB as the session store
app.use(
  session({
    secret: 'web project', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Replace with your MongoDB URI
    }),
  })
);

// Initialize cart in session
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(bodyParser.json()); // Parse JSON data

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'My Express App' });
});

app.get('/orderform', (req, res) => {
  const cartItems = req.query.cartItems; // Retrieve cart items from query parameters
  res.render('orderform', { cartItems });
});

app.get('/newarrivals', async (req, res) => {
  try {
    const products = await Product.find({ category: 'newarrivals' }); // Ensure this matches your database schema
    res.render('newarrivals', { products: products }); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});
// Product Categories
const categories = [
  'name',
  'anniversary',
  'motif',
  'stone',
  'calligraphy',
  'deal'
];

categories.forEach((category) => {
  app.get(`/${category}_category`, async (req, res) => {
    try {
      const products = await Product.find({ category });
      res.render(`${category}category`, { products });
    } catch (err) {
      console.error(`Error fetching ${category} products:`, err);
      res.status(500).send(`Error fetching ${category} products`);
    }
  });
});

// Contact Form Routes
app.get('/contactform', (req, res) => {
  res.render('contactform');
});

app.post('/submit-contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('All fields are required!');
  }

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.render('thankyou', { name, mymessage: 'Thank you for reaching out to us!' });
  } catch (error) {
    console.error('Error saving contact message:', error.message);
    res.status(500).send('Error saving your message. Please try again later.');
  }
});


// Custom Order Form Routes
app.get('/customform', (req, res) => {
  res.render('customform', { title: 'Custom Order Form' });
});

app.post('/submit-custom-order', async (req, res) => {
  const { name, phone, size, follow, finishing, script, description } = req.body;

  const followChecked = follow === 'on';

  if (!name || !size || follow === undefined || !finishing || !script) {
    return res.status(400).send('All required fields must be filled!');
  }

  try {
    const newCustomOrder = new CustomOrder({
      name,
      phone,
      size,
      follow: followChecked,
      finishing,
      script,
      description,
    });

    await newCustomOrder.save();
    res.render('thankyou', { name, mymessage: 'Thank you for your custom order. Our team will contact you soon!' });
  } catch (error) {
    console.error('Error saving custom order:', error);
    res.status(500).send('Error saving your custom order. Please try again later.');
  }
});

// Registration Form
app.get('/registration', (req, res) => {
  res.render('registration', { title: 'Registration - The Right Scriptz' });
});

app.post('/submit-registration', async (req, res) => {
  const { username, email, password, phone, city } = req.body;

  if (!username || !email || !password || !phone || !city) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const newUser = new User({ username, email, password, phone, city });
    await newUser.save();
    res.render('thankyou', { name: username, mymessage: 'Registration successful!' });
  } catch (error) {
    console.error('Error saving user data:', error);

    if (error.code === 11000) {
      return res.status(400).send('This email is already registered.');
    }

    res.status(500).send('An error occurred. Please try again later.');
  }
});

// Cart and Order Routes
app.post('/add-to-cart', (req, res) => {
  const { productId, productName, productPrice } = req.body;

  if (!productId || !productName || !productPrice) {
    return res.status(400).json({ error: 'Missing product details' });
  }

  const cartItem = req.session.cart.find((item) => item.productId === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    req.session.cart.push({
      productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  res.status(200).json({ success: true, cart: req.session.cart });
});

app.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  res.render('cart', { cart, totalPrice });
});

// Submit order
app.post('/submit-order', async (req, res) => {
  const cart = req.session.cart || [];

  if (cart.some((item) => !item.productId)) {
    return res.status(400).send('Cart items are missing product IDs.');
  }

  try {
    const newOrder = new Item({
      customerDetails: req.body,
      cartItems: cart,
      totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      orderDate: new Date(),
    });

    await newOrder.save();
    req.session.cart = [];
    res.render('thankyou', { name: req.body.name, mymessage: 'Thank you for your order!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).send('Error saving order');
  }
});

// About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});



app.post('/cart/delete', (req, res) => {
  const { productId } = req.body;

  // Remove the product from the cart
  req.session.cart = req.session.cart.filter((item) => item.productId !== productId);

  // Redirect back to the cart page
  res.redirect('/cart');
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
