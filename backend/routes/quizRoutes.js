const express = require("express");
const { getQuestion, submitAnswer,getStats , getQuestionsBulk} = require("../controllers/quizController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/question", auth, getQuestion);
router.post("/answer", auth, submitAnswer);
router.get("/stats", auth, getStats);
router.get("/bulk", auth, getQuestionsBulk);

module.exports = router;