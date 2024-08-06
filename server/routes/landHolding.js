const express = require('express');
const { createLandHolding, getLandHoldings, updateLandHoldings, deleteLandHoldings } = require('../controllers/landHoldingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createLandHolding);
router.get('/', auth, getLandHoldings);
router.put('/', auth, updateLandHoldings);
router.delete('/', auth, deleteLandHoldings);

module.exports = router;