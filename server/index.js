const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// connection to MondoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/owners', require('./routes/owners'));
app.use('/api/landholdings', require('./routes/landHoldings'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})