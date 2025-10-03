const express = require("express");
const router = express.Router();
const {
  adminFound,
  adminRegister,
  adminLogin,
  getLeadFormData,
  postLeadFormData,
} = require("../controller/adminController");

let { isAuthenticated } = require("../middleware/authendicated");
const {
  getBranchDetail,
  postbranchDetails,
} = require("../controller/branchController");

router.get("/admin", adminFound);
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/leadForm", isAuthenticated, getLeadFormData);
router.post("/admin/postLead", isAuthenticated, postLeadFormData);

// branch

router.get("/branchDetails", isAuthenticated, getBranchDetail);
router.post("/createBranch", isAuthenticated, postbranchDetails);
module.exports = router;
