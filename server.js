const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3232;
const mailerCollection = require('./userModel'); // Import your Mongoose model

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/mailerDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Express Routes
app.get('/', async (req, res) => {
  try {
    // Fetch data from the MongoDB database
    const users = await mailerCollection.find();

    // Display the fetched data as a JSON response
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ error: 'Name, email, and age are required' });
    }

    const newUser = new User({
      name,
      email,
      age,
    });

    await newUser.save();

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
