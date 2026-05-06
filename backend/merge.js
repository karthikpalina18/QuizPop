const fs = require("fs");

const attempts = JSON.parse(fs.readFileSync("attempts.json"));
const questions = JSON.parse(fs.readFileSync("questions.json"));
const users = JSON.parse(fs.readFileSync("users.json"));

const merged = attempts.map(a => {
  const q = questions.find(q => q._id === a.questionId);
  const u = users.find(u => u._id === a.userId);

  return {
    userId: a.userId,
    skillLevel: u?.skillLevel || "unknown",
    topic: q?.topic || "unknown",
    difficulty: q?.difficulty || "unknown",
    isCorrect: a.isCorrect
  };
});

fs.writeFileSync("final_dataset.json", JSON.stringify(merged, null, 2));

console.log("Merged ✅");