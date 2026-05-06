const Question = require("../models/Question");
const Attempt = require("../models/Attempt");

// Difficulty helpers
const increaseLevel = (level) => {
    if (level === "easy") return "medium";
    if (level === "medium") return "hard";
    return "hard";
};

const decreaseLevel = (level) => {
    if (level === "hard") return "medium";
    if (level === "medium") return "easy";
    return "easy";
};

// 🔥 GET ADAPTIVE QUESTION (FIXED)
const getQuestion = async (req, res) => {
    try {
        const userId = req.user.id;
        const { topic } = req.query;

        let difficulty = "easy";

        // Get last attempt
        const last = await Attempt.findOne({ userId }).sort({ _id: -1 });

        if (last) {
            difficulty = last.isCorrect
                ? increaseLevel(last.difficulty)
                : decreaseLevel(last.difficulty);
        }

        // 🔥 Get questions of that difficulty
        let questions = await Question.find({ topic, difficulty });

        // 🔥 FALLBACK if no questions found
        if (questions.length === 0) {
            console.log("No questions for", difficulty, "→ fallback");

            questions = await Question.find({ topic });

            if (questions.length === 0) {
                return res.json(null); // no data at all
            }
        }

        // 🔥 RANDOM QUESTION (VERY IMPORTANT)
        const question = questions[Math.floor(Math.random() * questions.length)];

        res.json(question);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// ✅ SUBMIT ANSWER
const submitAnswer = async (req, res) => {
    try {
        const { questionId, selected } = req.body;

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const isCorrect = question.answer === selected;

        await Attempt.create({
            userId: req.user.id,
            questionId,
            isCorrect,
            difficulty: question.difficulty
        });

        res.json({ correct: isCorrect });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ STATS API
const getStats = async (req, res) => {
    try {
        const attempts = await Attempt.find({ userId: req.user.id });

        const total = attempts.length;
        const correct = attempts.filter(a => a.isCorrect).length;

        const accuracy = total
            ? ((correct / total) * 100).toFixed(2)
            : 0;

        res.json({ total, correct, accuracy });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getQuestionsBulk = async (req, res) => {
    try {
        const { topic, limit } = req.query;

        const questions = await Question.aggregate([
            { $match: { topic } },
            { $sample: { size: parseInt(limit) } }
        ]);

        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { getQuestion, submitAnswer, getStats, getQuestionsBulk };