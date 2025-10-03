const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin, LeadForm } = require("../model/admin");

// Admin routes
exports.adminFound = async (req, res) => {
  const data = await Admin.find();
  if (data.length > 0)
    return res.status(200).json({ message: "Admin found", data });
  res.status(404).json({ message: "No admin found" });
};

exports.adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered", data: newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const valid = await bcryptjs.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LeadForm routes
exports.getLeadFormData = async (req, res) => {
  const data = await LeadForm.find();
  if (data.length === 0)
    return res.status(404).json({ message: "No data found" });
  res.status(200).json({ message: "Data fetched", data });
};

exports.postLeadFormData = async (req, res) => {
  try {
    // Always send all fields, even for mobile
    const fullData =
      req.body.leadData && req.body.paperData && req.body.eduData
        ? {
            ...req.body.leadData,
            ...req.body.paperData,
            ...req.body.eduData,
          }
        : req.body; // fallback for mobile mode

    const normalizedData = {
      ...fullData,
      gender: fullData.gender?.toLowerCase(),
      leadType: fullData.leadType?.toLowerCase(),
      source: fullData.source?.toLowerCase(),
      assignBranch: fullData.branch?.toLowerCase(),
      assignPerson: fullData.person,
      nextFollowUp: fullData.nextFollowDate,
      qualification: fullData.qualification,
      college: fullData.college,
      department: fullData.department,
      startYear: fullData.startYear,
      endYear: fullData.endYear,
      employmentStatus: fullData.status?.toLowerCase(),
      enquiryCount: fullData.enquiryCount,
      reqCourse: Array.isArray(fullData.courses)
        ? fullData.courses.join(", ")
        : fullData.reqCourse || "",
      createdBy: req.user.id,
      conversation: fullData.conversation,
    };

    const lead = new LeadForm(normalizedData);
    await lead.save();

    res.status(201).json({ message: "Lead saved successfully", data: lead });
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({ message: err.message });
    res.status(500).json({ message: "Internal server error" });
  }
};
