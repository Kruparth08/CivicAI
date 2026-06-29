const Issue = require("../models/Issue");

/* =========================
   USER DASHBOARD
========================= */
const getMyDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalIssues = await Issue.countDocuments({
      reportedBy: userId,
    });

    const pendingIssues = await Issue.countDocuments({
      reportedBy: userId,
      status: "Pending",
    });

    const resolvedIssues = await Issue.countDocuments({
      reportedBy: userId,
      status: "Resolved",
    });

    const highPriorityIssues = await Issue.countDocuments({
      reportedBy: userId,
      priority: { $in: ["High", "Emergency"] },
    });

    const recentIssues = await Issue.find({
      reportedBy: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status priority category createdAt");

    // CATEGORY STATS (FIXED)
    const categoryStats = await Issue.aggregate([
      {
        $match: { reportedBy: userId },
      },
      {
        $group: {
          _id: { $ifNull: ["$category", "Other"] },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // DEPARTMENT STATS (FIXED)
    const departmentStats = await Issue.aggregate([
      {
        $match: { reportedBy: userId },
      },
      {
        $group: {
          _id: { $ifNull: ["$department", "Unknown"] },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      totalIssues,
      pendingIssues,
      resolvedIssues,
      highPriorityIssues,
      recentIssues,
      categoryStats,
      departmentStats,
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   ADMIN DASHBOARD
========================= */
const getAdminDashboard = async (req, res) => {
  try {
    const totalIssues = await Issue.countDocuments();

    const pendingIssues = await Issue.countDocuments({
      status: "Pending",
    });

    const resolvedIssues = await Issue.countDocuments({
      status: "Resolved",
    });

    const highPriorityIssues = await Issue.countDocuments({
      priority: { $in: ["High", "Emergency"] },
    });

    // CATEGORY STATS (FIXED)
    const categoryStats = await Issue.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$category", "Other"] },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // DEPARTMENT STATS (FIXED)
    const departmentStats = await Issue.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$department", "Unknown"] },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      totalIssues,
      pendingIssues,
      resolvedIssues,
      highPriorityIssues,
      categoryStats,
      departmentStats,
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getMyDashboard,
  getAdminDashboard,
};