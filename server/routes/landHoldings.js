const express = require('express');
const { createLandHolding, getLandHoldings, updateLandHoldings, deleteLandHolding, uploadFile, getLandHoldingById } = require('../controllers/landHoldingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createLandHolding);
router.get('/', auth, getLandHoldings);
router.get('/:id', auth, getLandHoldingById);
router.put('/:id', auth, updateLandHoldings);
router.delete('/:id', auth, deleteLandHolding);
router.post('/:id/upload', auth, uploadFile)

module.exports = router;