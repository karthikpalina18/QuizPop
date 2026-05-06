const fs = require("fs");

const data = JSON.parse(fs.readFileSync("final_dataset.json"));

// CSV headers
const headers = ["userId", "skillLevel", "topic", "difficulty", "isCorrect"];

// Convert JSON → CSV
const csv = [
  headers.join(","), // header row
  ...data.map(row =>
    headers.map(field => `"${row[field] ?? ""}"`).join(",")
  )
].join("\n");

// Save file
fs.writeFileSync("final_dataset.csv", csv);

console.log("CSV file created ✅");