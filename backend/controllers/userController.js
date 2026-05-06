const User = require("../models/User");

const updateProfile = async (req, res) => {
    const { topics, skillLevel } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { topics, skillLevel },
        { new: true }
    );

    res.json(user);
};

module.exports = { updateProfile };