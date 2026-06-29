require("dotenv").config();

const {
  analyzeIssue,
} = require(
  "./src/services/geminiService"
);

async function test() {
  const result =
    await analyzeIssue(
      "No water& light working",
      "From past 2 days the water not coming and also from 4 hour light gone."
    );

  console.log(result);
}

test();