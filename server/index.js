const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

const allowedOrigins = ['https://giomogi.github.io/'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// connection to MondoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/owners', require('./routes/owners.js'));
app.use('/api/landholdings', require('./routes/landHoldings.js'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})