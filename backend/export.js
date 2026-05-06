require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection.db;

  const attempts = await db.collection("attempts").find({}).toArray();
  const questions = await db.collection("questions").find({}).toArray();
  const users = await db.collection("users").find({}).toArray();

  fs.writeFileSync("attempts.json", JSON.stringify(attempts, null, 2));
  fs.writeFileSync("questions.json", JSON.stringify(questions, null, 2));
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  console.log("Exported ✅");
  process.exit();
}

run();
