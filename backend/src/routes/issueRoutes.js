const express = require("express");

const {
  createIssue,getAllIssues,getMyIssues,getIssueById,getAllIssuesAdmin,updateIssueStatus,deleteIssue,updateIssue
} = require(
  "../controllers/issueController"
);


const adminMiddleware =
  require(
    "../middleware/adminMiddleware"
  );

const authMiddleware = require("../middleware/authMiddleware")  

const upload = require("../middleware/uploadMiddleware")


const router = express.Router();

router.post(
  "/",
  authMiddleware,upload.single("image"),
  createIssue
);

router.get(
  "/",
  getAllIssues
);

router.get(
  "/my",
  authMiddleware,
  getMyIssues
);

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllIssuesAdmin
);

router.get(
  "/:id",
  authMiddleware,
  getIssueById
);

router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateIssueStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteIssue
);

router.put("/:id", authMiddleware, updateIssue);


module.exports = router;