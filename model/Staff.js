const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branchschema",
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{12}$/, "Aadhar number must be 12 digits"],
  },
  phoneNo: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10"],
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  permission: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
});

const staff = mongoose.model("staff", staffSchema);

module.exports = staff;
