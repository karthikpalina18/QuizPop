const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashed });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user._id }, "secret");

        res.json({ token, user });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { signup, login };