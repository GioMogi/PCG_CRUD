const express = require('express');
const { signUp, login } = require('../controllers/authController');
const router = express.Router();