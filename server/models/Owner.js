const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    required: true,
    enum: ['Company', 'Individual', 'Investor', 'Trust'],
  },
  ownerType: {
    type: String,
    required: true,
    enum: ['Competitor', 'Seller', 'Investor', 'Professional'],
  },
  address: {
    type: String,
    required: true,
  },
  totalLandHoldings: {
    type: Number,
    default: 0,
  },
});

module.export = mongoose.model('Owner', OwnerSchema);