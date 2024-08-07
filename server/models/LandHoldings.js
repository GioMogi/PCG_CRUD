const mongoose = require('mongoose');

const LandHoldingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: false,
  },
  legalEntity: {
    type: String,
    required: true,
  },
  netMineralAcres: {
    type: Number,
    required: true,
  },
  mineralOwnerRoyalty: {
    type: Number,
    required: true,
  },
  sectionName: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
    match: /^[0-9]{3}$/,
  },
  township: {
    type: String,
    required: true,
    match: /^[0-9]{3}[NS]$/,
  },
  range: {
    type: String,
    required: true,
    match: /^[0-9]{3}[EW]$/,
  },
  titleSource: {
    type: String,
    required: true,
    enum: ['Class A', 'Class B', 'Class C', 'Class D'],
  },
  files: [{ type: String }] // array of file paths
});

module.exports = mongoose.model('LandHolding', LandHoldingSchema);