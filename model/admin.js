const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const LeadFormSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdTime: { type: Date, default: Date.now },

  // LeadForm fields
  source: {
    type: String,
    enum: ["google", "facebook", "direct", "reference", "justdial"],
    required: function () {
      return this.deviceType === "desktop";
    },
  },
  name: {
    type: String,
    required: function () {
      return this.deviceType === "desktop";
    },
  },
  phone: {
    type: String,
    required: function () {
      return this.deviceType === "desktop";
    },
  },
  whatsapp: {
    type: String,
    required: function () {
      return this.deviceType === "desktop";
    },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: function () {
      return this.deviceType === "desktop";
    },
  },
  leadType: {
    type: String,
    enum: ["lead", "fake"],
    required: function () {
      return this.deviceType === "desktop";
    },
  },
  courses: {
    type: [String],
    required: function () {
      return this.deviceType === "desktop";
    },
  },
  location: {
    type: String,
    required: function () {
      return this.deviceType === "desktop";
    },
  },

  // device type
  deviceType: {
    type: String,
    enum: ["desktop", "mobile"],
    required: true,
  },
  // PaperForm fields
  conversation: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  nextFollowDate: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  branch: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  person: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },

  // EducationForm fields
  qualification: {
    type: String,
    enum: ["arts", "engineering", "diploma", "science", "commerce"],
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  college: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  department: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  startYear: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  endYear: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  status: {
    type: String,
    enum: ["working", "student", "unemployement"],
    required: () => {
      return this.deviceType === "desktop";
    },
  },
  enquiryCount: {
    type: String,
    required: () => {
      return this.deviceType === "desktop";
    },
  },
});

const Admin = mongoose.model("Admin", adminSchema);
const LeadForm = mongoose.model("LeadForm", LeadFormSchema);

module.exports = { Admin, LeadForm };
