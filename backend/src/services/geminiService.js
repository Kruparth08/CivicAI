const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeIssue = async (title, description) => {
  let response;

  try {
    const prompt = `
You are an AI assistant for a civic issue reporting platform.

Analyze the following issue and return ONLY valid JSON.

Issue Title:
${title}

Issue Description:
${description}

Return ONLY raw JSON.
Do not wrap the JSON in markdown.
Do not use \`\`\`json or \`\`\`.

Return this exact JSON structure:

{
  "category": "",
  "priority": "",
  "department": "",
  "summary": "",
  "citizenAdvice": "",
  "governmentAction": "",
  "estimatedDays": 0,
  "confidence": 95,
  "followUpQuestions": []
}

If the issue description is complete,
return:

"followUpQuestions": []

If important information is missing,
generate up to 3 short questions that would help the municipality resolve the issue.

Examples:

- What is the exact location?
- Since when has this problem existed?
- Is it affecting traffic?

Rules:

Categories:
- Road Damage
- Garbage
- Water Supply
- Electricity
- Street Lights
- Traffic
- Drainage
- Other

Priorities:
- Low
- Medium
- High
- Emergency

Departments:
- Road and Infrastructure
- Sanitation
- Water Department
- Electric Department
- Traffic Police
- Municipal Corporation

Summary:
Write one short sentence describing the issue.

Citizen Advice:
Write one practical action the citizen should take immediately.

Government Action:
Write one concise sentence explaining what the responsible department should do.

Estimated Resolution Days:
Return ONLY a number.

Examples:
Emergency -> 1
High -> 3
Medium -> 7
Low -> 14

Confidence:
Return a number between 60 and 100 representing how confident you are in the classification.
`;

    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
    } catch (error) {
      if (
        error.status === 503 ||
        error.message?.includes("503")
      ) {
        console.log(
          "Gemini busy, Retrying in 2 seconds..."
        );

        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );

        response =
          await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
          });
      } else {
        throw error;
      }
    }

    let text = response.text.trim();

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {
    console.log(error);

    if (response) {
      console.log(response.text);
    }

    return {
      category: "Other",
      priority: "Medium",
      department: "Municipal Corporation",
      summary: "AI analysis unavailable.",
      citizenAdvice:
        "Please contact your local municipal authority if the issue becomes serious.",
      governmentAction:
        "Inspect the reported location and take appropriate action.",
      estimatedDays: 7,
      confidence: 75,
      followUpQuestions: [],
    };
  }
};

module.exports = {
  analyzeIssue,
};