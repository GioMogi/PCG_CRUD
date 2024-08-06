const Owner = require('../models/Owner');
const LandHolding = require('../models/LandHoldings');

exports.createOwner = async (req, res) => {
  const { name, entityType, ownerType, address } = req.body;

  try {
    const ownerExists = await Owner.findOne({ name, address});
    if (ownerExists) {
      return res.status(400).json({ message: 'Owner already exists' });
    }

    const newOwner = new Owner({
      name,
      entityType,
      ownerType,
      address,
    });

    await newOwner.save();
    res.json(newOwner);
  } catch (error) {
    res.status(500).json({message: 'Server error'});
  }
};

exports.getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
};

exports.updateOwner = async (req, res) => {
  const { id } = req.params;
  const { name, entityType, ownerType, address } = req.body;

  try {
    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(400).json({ message: 'Owner not found' });
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
    await owner.remove.remove();

    res.json({ message: 'Owner and related land holdings deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
};