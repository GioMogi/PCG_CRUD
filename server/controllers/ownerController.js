const Owner = require('../models/Owner');
const LandHolding = require('../models/LandHoldings');

const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ dest: 'uploads/'});

exports.createOwner = async (req, res) => {
  const { name, entityType, ownerType, address } = req.body;

  try {
    console.log('Received data:', { name, entityType, ownerType, address });
    const ownerExists = await Owner.findOne({ name, address });
    console.log('Owner exists check:', ownerExists);
    if (ownerExists) {
      return res.status(400).json({ message: 'Owner with this name and address already exists' });
    }

    const newOwner = new Owner({
      name,
      entityType,
      ownerType,
      address,
    });

    await newOwner.save();
    console.log('New owner created:', newOwner);
    res.status(201).json(newOwner);
  } catch (error) {
    console.error('Error creating owner:', error.message);
    res.status(500).json({message: 'An error occurred while creating the owner.'});
  }
};

exports.getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    const ownersWithLandHoldings = await Promise.all(owners.map(async (owner) => {
      const landHoldingsCount = await LandHolding.countDocuments({ owner: owner._id });
      return {
        ...owner._doc,
        totalLandHoldings: landHoldingsCount,
      };
    }))
    res.json(ownersWithLandHoldings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
};

exports.getOwnerById = async (req, res) => {
  try{
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    const landHoldingsCount = await LandHolding.countDocuments({ owner: owner._id });
    res.json({
      ...owner._doc,
      totalLandHoldings : landHoldingsCount
    });
  } catch (error) {
    console.error('Error fetching owner details:', error.message);
    res.status(500).json({ message: 'An error occurred while fetching owner details'});
  }
};

exports.updateOwner = async (req, res) => {
  const { id } = req.params;
  const { name, entityType, ownerType, address } = req.body;

  try {
    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(40).json({ message: 'Owner not found' });
    }

    owner.name = name || owner.name;
    owner.entityType = entityType || owner.entityType;
    owner.ownerType = ownerType || owner.ownerType;
    owner.address = address || owner.address;

    await owner.save();
    res.json(owner);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteOwner = async (req, res) => {
  const { id } = req.params;

  try {
    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    await LandHolding.deleteMany({ owner: id });
    await owner.deleteOne();

    res.json({ message: 'Owner and related land holdings deleted' });
  } catch (error) {
    console.error("error deleting Owner", error.message);
    res.status(500).json({ message: 'An error occurred while deleting owner' })
  }
};

// for uploads
exports.uploadFile = [upload.single('file'), async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found'});
    }
    owner.files.push(req.file.path);
    await owner.save();

    res.json({ filePath: req.file.path });
  } catch (error) {
    console.error("Error occurred on file upload:", error.message)
    res.status(500).json({ message: 'Upload error'});
  }
}];