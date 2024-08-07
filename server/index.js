const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();
const path = require('path');
const fs = require('fs');

dotenv.config();


app.use(cors({
  origin: ['https://pcg-crud.vercel.app'], // Add your frontend URLs here
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

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/owners', require('./routes/owners.js'));
app.use('/api/landholdings', require('./routes/landHoldings.js'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})