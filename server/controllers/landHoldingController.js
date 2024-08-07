const LandHolding = require('../models/LandHoldings');
const Owner = require('../models/Owner')
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

const upload = multer({ storage: storage });

exports.createLandHolding = async (req, res) => {
  const { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource } = req.body;

  try {
    console.log("Creating land holding with data:", req.body);
    const newLandHolding = new LandHolding({
      name,
      owner,
      legalEntity,
      netMineralAcres,
      mineralOwnerRoyalty,
      sectionName,
      section,
      township,
      range,
      titleSource,
    });
    let savedLandHolding = await newLandHolding.save();
    console.log("saved land holdings:", savedLandHolding)

    if (owner) {
      await Owner.findByIdAndUpdate(owner, { $inc: { totalLandHoldings: 1 } })
      // populate owner details before sending the response
      // need this so user doesn't have to refresh page to see owner on table
      savedLandHolding = await savedLandHolding.populate('owner')
    }

    res.status(201).json(savedLandHolding);
  } catch (error) {
    console.error('Error create land holding:', error.message)
    res.status(500).json({ message: 'An error occurred while creating land holding' });
  }
};

exports.getLandHoldings = async (req, res) => {
  try {
    const landHoldings = await LandHolding.find().populate('owner');
    res.json(landHoldings);
  } catch (error) {
    console.error('Error retrieving land holding:', error.message)
    res.status(500).json({ message: 'An error occurred while retrieving land holding' });
  }
};

exports.getLandHoldingById = async (req, res) => {
  const { id } = req.params;

  try {
    const landHolding = await LandHolding.findById(id).populate('owner');
    if (!landHolding) {
      return res.status(404).json({ message: 'Land holding not found' });
    }
    res.json(landHolding);
  } catch (error) {
    console.error('Error retrieving land holding:', error.message);
    res.status(500).json({ message: 'An error occurred while retrieving the land holding' });
  }
};


exports.updateLandHoldings = async (req, res) => {
  const { id } = req.params;
  const { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource } = req.body;

  try {
    let landHolding = await LandHolding.findById(id);
    if (!landHolding) {
      return res.status(404).json({ message: 'Land Holding not found' });
    }

    landHolding.name = name || landHolding.name;
    landHolding.owner = owner || landHolding.owner;
    landHolding.legalEntity = legalEntity || landHolding.legalEntity;
    landHolding.mineralOwnerRoyalty = mineralOwnerRoyalty || landHolding.mineralOwnerRoyalty;
    landHolding.netMineralAcres = netMineralAcres || landHolding.netMineralAcres;
    landHolding.sectionName = sectionName || landHolding.sectionName;
    landHolding.section = section || landHolding.section;
    landHolding.township = township || landHolding.township;
    landHolding.range = range || landHolding.range;
    landHolding.titleSource = titleSource || landHolding.titleSource;

    const updatedLandHolding = await landHolding.save();
    res.json(updatedLandHolding);
  } catch (error) {
    console.error('Error updating land holding', error.message)
    res.status(500).json({ message: 'Error updating land holding' });
  }
};

exports.deleteLandHolding = async (req, res) => {
  const { id } = req.params;

  try {
    const landHolding = await LandHolding.findById(id);
    if (!landHolding) {
      return res.status(404).json({ message: 'Land Holding not found' });
    }

    const owner = landHolding.owner;

    await landHolding.deleteOne();

    if (owner) {
      await Owner.findByIdAndUpdate(owner, { $inc: { totalLandHoldings: -1 } })
    }

    res.json({ message: 'Land Holding deleted' });
  } catch (error) {
    console.error("Problem deleting land holding:", error.message)
    res.status(500).json({ message: 'An error occurred deleting land holding' });
  }
};

exports.uploadFile = [upload.single('file'), async (req, res) => {
  const { id } = req.params;

  try {
    const landHolding = await LandHolding.findById(id);
    if (!landHolding) {
      return res.status(404).json({ message: 'Land holding not found' });
    }

    if (!landHolding.files) {
      landHolding.files = [];
    }

    const filePath = req.file.filename; 
    landHolding.files.push(filePath);
    await landHolding.save();

    const updatedLandHolding = await landHolding.populate('owner')

    res.json(updatedLandHolding);
  } catch (error) {
    console.error("Error uploading land holdings file:", error.message);
    res.status(500).json({ message: 'Upload error' });
  }
}];