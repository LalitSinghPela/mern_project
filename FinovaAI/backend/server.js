const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;


require("dotenv").config();

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://finovanp.vercel.app"
      
    
    ],
    credentials: true,
  })
);
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/income", require("./routes/income"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/ai", require("./routes/ai"));

app.use("/api/user", require("./routes/user"));

// app.listen(5000, () => console.log("Server running"));
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
console.log("KEY:", process.env.GROQ_API_KEY);

