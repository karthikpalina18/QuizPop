const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
    userId: String,
    questionId: String,
    isCorrect: Boolean,
    difficulty: String
});

module.exports = mongoose.model("Attempt", attemptSchema);