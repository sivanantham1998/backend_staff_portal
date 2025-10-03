const branch = require("../model/branch");
exports.getBranchDetail = async (req, res, next) => {
  try {
    let data = await branch.find();
    if (data.length > 0) {
      res.status(200).json({ message: "staff details", data });
    } else {
      res.status(404).json({ message: "no data found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.postbranchDetails = async (req, res) => {
  try {
    const {
      branchName,
      branchLocation,
      branchId,
      branchAddress,
      gpayUpiId,
      admissionPrefix,
    } = req.body;

    const data = new branch({
      createdBy: req.user.id,
      branchName,
      branchLocation,
      branchId,
      branchAddress,
      gpayUpiId,
      admissionPrefix,
    });
    await data.save();
    res.status(201).json({ message: "Branch created!!!", data });
  } catch (error) {
    res.status(500).json({ message: "internal server error" + error.message });
  }
};
