const staff = require("../model/Staff");

exports.getStaffDetails = async (req, res) => {
  try {
    const data = await staff.find();

    if (data.length > 0) {
      res.status(201).json({ message: "staff data getting successful", data });
    } else {
      res.status(404).json({ message: "no data found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal error", error: error.message });
  }
};

exports.getNextId = async (req, res) => {
  try {
    let lastStaff = await staff.findOne().sort({ adminId: -1 });

    let newId;

    if (!lastStaff) {
      newId = "001";
    } else {
      const lastId = parseInt(lastStaff.adminId, 10);
      newId = String(lastId + 1).padStart(3, "0");
    }
    res.json({ nextId: newId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const {
      branchId,
      branchName,
      name,
      userName,
      password,
      dob,
      aadhar,
      phoneNo,
      gender,
      role,
      permission,
      address,
      adminId,
      email,
    } = req.body;
    const data = new staff({
      createdBy: req.user.id,
      branchId,
      branchName,
      name,
      userName,
      password,
      dob,
      aadhar,
      phoneNo,
      gender,
      role,
      permission,
      address,
      adminId,
      email,
    });

    await data.save();
    res.status(201).json({ message: "data saved", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getBranchUserId = async (req, res) => {
//   try {
//     let { id } = req.params;
//     const data = await staff.find({ branchId: id });
//     console.log(data);
//     if (!data) {
//       res.status(404).json({ message: "no data found" });
//     } else {
//       res.status(200).json({ message: "data found", data });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getBranchUserId = async (req, res) => {
  try {
    const { id } = req.params; // this is the branchId you pass in URL

    // Find all staff with that branchId
    const data = await staff.find({ branchId: id });

    let male = data.filter((v) => v.gender === "male").length;
    let female = data.filter((v) => v.gender === "female").length;
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "no data found" });
    }
    res.status(200).json({ message: "data found", data, male, female });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
