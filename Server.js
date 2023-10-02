const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

const uri = "mongodb+srv://abmarcinek:hacking247@cluster0.jtp9c7g.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // ... other fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
