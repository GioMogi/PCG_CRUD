const LandHolding = require('../models/LandHoldings');

exports.createLandHolding = async (req, res) => {
  const { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource } = req.body;

  try {
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

    await newLandHolding.save();
    res.json(newLandHolding);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLandHoldings = async (req, res) => {
  try {
    const landHoldings = await LandHolding.find().populate('owner');
    res.json(landHoldings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLandHoldings = async (req, res) => {
  const { id } = req.params;
  const { name, owner, legalEntity, netMineralAcres, mineralOwnerRoyalty, sectionName, section, township, range, titleSource } = req.body;

  try {
    const landHolding = await landHolding.findById(id);
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

    await landHolding.save();
    res.json(landHolding);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}