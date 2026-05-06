const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(
  cors({
    origin: "https://quizpopy.netlify.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch(err => console.log(err));