const { chatWithAgent } = require("../utils/agentAI");

const agentChat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await chatWithAgent(message, history);

    return res.status(200).json({
      success: true,
      data: {
        reply: result.reply,
        action: result.action,
        priority: result.priority,
        category: result.category,
        department: result.department,
        suggestions: result.suggestions,
        title: result.title,
        description: result.description,
        location: result.location,
      },
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "AI Agent Error",
    });
  }
};

module.exports = {
  agentChat,
};