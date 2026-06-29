const express = require("express");

const {
  getMyProfile,
  updateMyProfile,
  getPublicProfile,
} = require(
  "../controllers/userController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/me",
  protect,
  getMyProfile
);

router.put(
  "/me",
  protect,
  updateMyProfile
);

router.get(
  "/:id",
  getPublicProfile
);

module.exports = router;