  const Issue = require("../models/Issue");
  const { analyzeIssue } = require("../services/geminiService")
  const User = require("../models/User")


  const createIssue = async (req, res) => {
    try {
      const {
        title,
        description,
        location,
      } = req.body;

      const image = req.file?req.file.path:""

      if (
        !title ||
        !description ||
        !location
      ) {
        return res.status(400).json({
          message:
            "Title, description and location are required",
        });
      }

      let aiResult = {
  category: "Other",
  priority: "Medium",
  department: "Municipal Corporation",
  summary: "AI analysis unavailable",
  citizenAdvice:
    "Please report this issue to your local authority if it becomes urgent.",
  governmentAction:
    "Inspect the reported location and take appropriate action.",
  estimatedResolutionDays: 7,
};

      try{
          aiResult = await analyzeIssue(title,description)

      }catch(error){
          // // console.log("AI service failed :",
          //     error.message
          // )
      }

      const aiEscalated =
  aiResult.priority === "Emergency" ||
  aiResult.priority === "High";

      const issue = await Issue.create({
  title,
  description,
  location,
  image,
  category: aiResult.category,
  priority: aiResult.priority,
  department: aiResult.department,
  aiSummary: aiResult.summary,

  citizenAdvice: aiResult.citizenAdvice,
  governmentAction: aiResult.governmentAction,
  estimatedDays: aiResult.estimatedDays,
  aiConfidence: aiResult.confidence,
  aiFollowUpQuestions: aiResult.followUpQuestions,
  reportedBy: req.user._id,
  aiEscalated: aiEscalated
});

      await User.findByIdAndUpdate(
    req.user._id,
    {
      $inc: {
        points: 10,
      },
    }
  );

      res.status(201).json(issue);
    } catch (error) {
      // console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

  const getAllIssues = async (req, res) => {
    try {
      const issues = await Issue.find()
        .populate(
          "reportedBy",
          "name email profilePic"
        )
        .sort({
          createdAt: -1,
        });

      res.status(200).json(issues);
    } catch (error) {
      // console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

  const getMyIssues = async (
    req,
    res
  ) => {
    try {
      const issues = await Issue.find({
        reportedBy: req.user._id,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json(issues);
    } catch (error) {
      // console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

  const getIssueById = async (
    req,
    res
  ) => {
    try {
      const issue = await Issue.findById(
        req.params.id
      ).populate(
        "reportedBy",
        "name email profilePic"
      );

      if (!issue) {
        return res.status(404).json({
          message: "Issue not found",
        });
      }

      res.status(200).json(issue);
    } catch (error) {
      // console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };
const getAllIssuesAdmin = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const issues = await Issue.find(filter)
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(issues);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

  const updateIssueStatus =
    async (req, res) => {
      try {
        const { status } =
          req.body;

        const issue =
          await Issue.findById(
            req.params.id
          );

        if (!issue) {
          return res
            .status(404)
            .json({
              message:
                "Issue not found",
            });
        }

        issue.status =
          status;

        await issue.save();

        res.status(200).json({
          message:
            "Status updated",
          issue,
        });
      } catch (error) {
        // console.log(error);

        res.status(500).json({
          message:
            "Server Error",
        });
      }
    };

    const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    // ownership check (IMPORTANT SECURITY)
    if (issue.reportedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized to delete this issue",
      });
    }

    await Issue.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Issue deleted successfully",
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }

};


const updateIssue = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    // ownership check
    if (issue.reportedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized to update this issue",
      });
    }

    const {
  priority,
  category,
  department,
  aiSummary,
} = req.body;

if (title !== undefined) issue.title = title;
if (description !== undefined) issue.description = description;
if (location !== undefined) issue.location = location;
if (priority !== undefined) issue.priority = priority;
if (category !== undefined) issue.category = category;
if (department !== undefined) issue.department = department;
if (aiSummary !== undefined) issue.aiSummary = aiSummary;

    // optional image update
    if (req.file) {
      issue.image = req.file.path;
    }

    await issue.save();

    res.status(200).json({
      message: "Issue updated successfully",
      issue,
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};


  module.exports = {
    createIssue,getAllIssues,getMyIssues,getIssueById,getAllIssuesAdmin,updateIssueStatus,deleteIssue,updateIssue
  };