require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const router = express.Router();

async function findUser(email, password) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Users'); // Your database name
    const collection = database.collection('User'); // Your collection name

    const user = await collection.findOne({ email, password });

    return user;
  } finally {
    await client.close();
  }
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received email:', email);
  console.log('Received password:', password);

  const user = await findUser(email, password);
  console.log('Found user:', user);

  if (!user) {
    return res.status(401).json({ message: 'Invalid' });
  }

  // Generate an authentication token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

console.log(token);

  res.json({ token });
});

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});