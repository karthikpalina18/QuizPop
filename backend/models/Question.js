const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: String,
    difficulty: String,
    topic: String
});

module.exports = mongoose.model("Question", questionSchema);