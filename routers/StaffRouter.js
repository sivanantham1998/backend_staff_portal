const express = require("express");
const { isAuthenticated } = require("../middleware/authendicated");
const {
  getStaffDetails,
  getNextId,
  createAdmin,
  getBranchUserId,
} = require("../controller/staffController");
const router = express.Router();

router.get("/admin", isAuthenticated, getStaffDetails);
router.get("/adminNextId", isAuthenticated, getNextId);
router.post("/createAdmin", isAuthenticated, createAdmin);
router.get("/:id", isAuthenticated, getBranchUserId);
module.exports = router;
