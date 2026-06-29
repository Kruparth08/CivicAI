const express = require(
  "express"
);

const {
  getMyDashboard,getAdminDashboard
} = require(
  "../controllers/dashboardController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router.get(
  "/my",
  protect,
  getMyDashboard
);

router.get("/admin",protect,getAdminDashboard)

module.exports = router;