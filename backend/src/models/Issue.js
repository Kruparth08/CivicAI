const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Emergency",
      ],
      default: "Medium",
    },

    department: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    image: [
      {
        type: String,
        default: "",
      },
    ],

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected",
      ],
      default: "Pending",
    },

    aiSummary: {
      type: String,
      default: "",
    },
    
    citizenAdvice: {
      type: String,
      default: "",
    },

    governmentAction: {
      type: String,
      default: "",
    },

    estimatedResolutionDays: {
      type: Number,
      default: 7,
    },

    aiConfidence: {
  type: Number,
  default: 0,
},

    aiEscalated: {
    type: Boolean,
    default: false,
},

aiQuestions: {
    type: [String],
    default: [],
},

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Issue",
  issueSchema
);