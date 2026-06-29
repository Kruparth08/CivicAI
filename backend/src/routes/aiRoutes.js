const express = require("express");

const { agentChat } = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/agent",
  authMiddleware,
  agentChat
);

module.exports = router;