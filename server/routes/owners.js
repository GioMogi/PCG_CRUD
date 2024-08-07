const express = require('express');
const { createOwner, getOwners, updateOwner, deleteOwner, uploadFile, getOwnerById } = require('../controllers/ownerController');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/', auth, createOwner);
router.get('/', auth, getOwners);
router.get('/:id', auth, getOwnerById);
router.put('/:id', auth, updateOwner);
router.delete('/:id', auth, deleteOwner);
router.post('/:id/upload', auth, uploadFile);

module.exports = router;