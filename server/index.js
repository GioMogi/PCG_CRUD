const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());

// connection to MondoDB
mongoose.connect('mongodb+srv://gmogi92:PCG123@cluster0.9zibsmr.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


