const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const buildHistoryText = (history = []) => {
  if (!history?.length) return "";

  return history
    .map((entry) => `${entry.sender === "user" ? "User" : "Assistant"}: ${entry.text}`)
    .join("\n");
};

const inferIssueDetails = (message, history = []) => {
  const userMessages = history
    .filter((entry) => entry.sender === "user")
    .map((entry) => entry.text?.trim())
    .filter(Boolean);

  if (message?.trim()) userMessages.push(message.trim());

  const combinedText = userMessages.join(" ");

  const locationMatch = combinedText.match(
    /(?:near|at|in|on|around|address|location)\s+([A-Za-z0-9 ,.-]+)/i
  );
  const location = locationMatch ? locationMatch[1].trim() : "";

  const titleCandidate = userMessages[0]
    ? userMessages[0]
        .replace(/\b(the|there is|there are|a|an)\b/gi, "")
        .split(/[.!?]/)[0]
        .trim()
    : "Civic issue";

  const title =
    titleCandidate.length > 70 ? `${titleCandidate.slice(0, 67)}...` : titleCandidate;
  const description = userMessages.join(" ").trim();

  return {
    title: title || "Civic issue",
    description: description || message?.trim() || "",
    location,
  };
};

const chatWithAgent = async (message, history = []) => {
  let response;

  try {
    const historyText = buildHistoryText(history);
    const inferred = inferIssueDetails(message, history);

    const prompt = `
You are CivicAI Agent for a civic issue reporting platform.
You help citizens describe and report problems.

Conversation history:
${historyText || "No prior conversation."}

Latest user message:
"${message}"

// Inferred issue details from the conversation:
// Title: ${inferred.title}
// Description: ${inferred.description}
// Location: ${inferred.location || "Not provided"}

Return ONLY valid JSON with no extra text or markdown.

{
  "reply": "",
  "action": "NONE",
  "priority": "Medium",
  "category": "Other",
  "department": "Municipal Corporation",
  "suggestions": [],
  "title": "",
  "description": "",
  "location": ""
}

Rules:
- If the conversation already contains enough information (clear title, description, AND specific location) to create a report, set action to "CREATE_ISSUE" and fill title, description, and location fields.
- If any key detail is missing or vague (e.g. location is "my house" or "nearby"), ask one short follow-up question in reply and keep action as "NONE".
- Keep the reply short and helpful.
- suggestions should be a maximum of 3 short bullet suggestions.
- Use category from: Road Damage, Garbage, Water Supply, Electricity, Street Lights, Traffic, Drainage, Other.
- Use priority from: Low, Medium, High, Emergency.
- Use department from: Road and Infrastructure, Sanitation, Water Department, Electric Department, Traffic Police, Municipal Corporation.
- Return JSON only. No markdown. No explanation.
`;

    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.2,
          maxOutputTokens: 800, // FIX: was 300, too low for full JSON response
        },
      });
    } catch (error) {
      if (error.status === 503 || error.message?.includes("503")) {
        console.log("Gemini busy, retrying in 2 seconds...");

        await new Promise((resolve) => setTimeout(resolve, 2000));

        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            temperature: 0.2,
            maxOutputTokens: 800,
          },
        });
      } else {
        throw error;
      }
    }

    const rawText = response?.text || "";
    let text = String(rawText).trim();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed = {};

    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      console.log("Gemini returned non-JSON text:", text);
      parsed = {
        reply:
          text ||
          "I can help you report the issue. Please tell me what is happening and where it is happening.",
        action: "NONE",
        priority: "Medium",
        category: "Other",
        department: "Municipal Corporation",
        suggestions: [],
        title: "",
        description: "",
        location: "",
      };
    }

    // FIX: Only use inferred data to FILL empty fields when Gemini already decided CREATE_ISSUE.
    // Never force CREATE_ISSUE from regex alone — Gemini decides intent.
    if (parsed.action === "CREATE_ISSUE") {
      parsed.title = parsed.title || inferred.title;
      parsed.description = parsed.description || inferred.description;
      parsed.location = parsed.location || inferred.location;
    }

    return {
      reply: parsed.reply || "I can help you report the issue.",
      action: parsed.action || "NONE",
      priority: parsed.priority || "Medium",
      category: parsed.category || "Other",
      department: parsed.department || "Municipal Corporation",
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      title: parsed.title || "",
      description: parsed.description || "",
      location: parsed.location || "",
    };
  } catch (error) {
    console.log(error);

    // Handle quota exceeded
    if (error.status === 429 || error.message?.includes("429")) {
      return {
        reply: "Right now AI is busy or limit is reached. Please try again after some time.",
        action: "NONE",
        priority: "Medium",
        category: "Other",
        department: "Municipal Corporation",
        suggestions: [],
        title: "",
        description: "",
        location: "",
      };
    }

    if (response) {
      console.log(response.text);
    }

    return {
      reply: "AI service error. Please try again later.",
      action: "NONE",
      priority: "Medium",
      category: "Other",
      department: "Municipal Corporation",
      suggestions: [],
      title: "",
      description: "",
      location: "",
    };
  }
};

module.exports = {
  chatWithAgent,
};
