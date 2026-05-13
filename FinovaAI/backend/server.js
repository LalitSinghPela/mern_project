const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const userRoutes = require("./routes/user");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/api/ai", aiRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/income", require("./routes/income"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/ai", require("./routes/ai"));
// app.use("/api/user", userRoutes);
app.use("/api/user", require("./routes/user"));
app.listen(5000, () => console.log("Server running on 5000"));
console.log("KEY:", process.env.GROQ_API_KEY);

