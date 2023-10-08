require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');

const corsOptions = {
  origin: 'https://nasa-backend-nine.vercel.app/', // Replace with your Vercel app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If your frontend sends cookies, you might need this
  optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

const router = express.Router();

async function findUser(email, password) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Users'); // Your database name
    const collection = database.collection('User'); // Your collection name

    const user = await collection.findOne({ email });

    if (!user) {
      return null; // User not found
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
    return null; // Password does not match
      }

    return user;
  } finally {
    await client.close();
  }
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser(email, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate an authentication token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// Function to create a new user in the database
async function createUser(email, password) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Users');
    const collection = database.collection('User');

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = {
      email: email,
      password: hashedPassword, // Store the hashed password
    };

    const result = await collection.insertOne(newUser);

    return result.insertedId; // Return the ID of the newly created user
  } finally {
    await client.close();
  }
}

// need to hide API key before pushing to GitHub
router.get('/apod', (req, res) => {
  const nasaURL = "https://api.nasa.gov/planetary/apod?api_key=";
  const key = process.env.NASA_API_KEY;
  const apiUrl = `${nasaURL}${key}`;

  axios.get(apiUrl)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data from NASA API' });
    });
});

// signup new user
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user with the same email already exists
  const existingUser = await findUser(email);

  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Create a new user in the database
  const userId = await createUser(email, password);

  if (!userId) {
    return res.status(500).json({ message: 'Error creating user' });
  }

  res.json({ message: 'User created successfully' });
});

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});