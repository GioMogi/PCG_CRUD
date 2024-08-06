const express = require('express');
const { createOwner, getOwners, updateOwner, deleteOwner } = require('../controllers/ownerController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createOwner);
router.get('/', auth, getOwners);
router.put('/:id', auth, updateOwner);
router.delete('/:id', auth, deleteOwner);

module.exports = router;