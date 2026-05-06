const express = require("express");
const { updateProfile } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/profile", auth, updateProfile);

module.exports = router;