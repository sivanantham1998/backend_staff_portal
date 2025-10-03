const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  branchLocation: {
    type: String,
    required: true,
  },
  branchId: {
    type: String,
    required: true,
  },
  branchAddress: {
    type: String,
    required: true,
  },
  gpayUpiId: {
    type: String,
    required: true,
  },
  admissionPrefix: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const branch = mongoose.model("branchschema", branchSchema);

module.exports = branch;
