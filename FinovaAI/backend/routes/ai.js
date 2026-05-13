// const express = require("express");
// const router = express.Router();
// const Groq = require("groq-sdk");
// const Income = require("../models/Income");
// const Expense = require("../models/Expense");


// const client = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// router.post("/chat", async (req, res) => {
//   try {
//     // const { message } = req.body;
//     const { message, history, userId } = req.body;

//     if (!message) {
//       return res.status(400).json({ msg: "Message required" });
//     }

//     const completion = await client.chat.completions.create({
//       // messages: [
//       //   {
//       //     role: "system",
//       //     content:
//       //       "You are a smart financial advisor. Give short and practical money advice.",
//       //   },
//       //   {
//       //     role: "user",
//       //     content: message,
//       //   },
//       // ],
//       messages: [
//   {
//     role: "system",
//     content: `
// You are an AI Financial Advisor.

// Use the user's financial data below to answer questions and provide insights.

// ${financeSummary}

// Give:
// - financial advice
// - spending analysis
// - savings suggestions
// - budgeting insights
// - category analysis
// - future recommendations
// `
//   },

//   ...history,

//   {
//     role: "user",
//     content: message,
//   },
// ],
//       model: "llama-3.1-8b-instant", // 🔥 fast + free
//     });

//     const reply = completion.choices[0].message.content;

//     res.json({ reply });

//   } catch (err) {
//     console.error("GROQ ERROR:", err.message);
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ================= FETCH USER DATA =================

// const incomes = await Income.find({ user: userId });

// const expenses = await Expense.find({ user: userId });


// // ================= CALCULATIONS =================

// const totalIncome = incomes.reduce(
//   (acc, item) => acc + item.amount,
//   0
// );

// const totalExpense = expenses.reduce(
//   (acc, item) => acc + item.amount,
//   0
// );

// const balance = totalIncome - totalExpense;


// // ================= CATEGORY ANALYSIS =================

// const expenseCategories = {};

// expenses.forEach((exp) => {

//   if (!expenseCategories[exp.category]) {
//     expenseCategories[exp.category] = 0;
//   }

//   expenseCategories[exp.category] += exp.amount;
// });


// // ================= FINANCIAL SUMMARY =================

// const financeSummary = `
// USER FINANCIAL DATA

// Total Income: ₹${totalIncome}

// Total Expenses: ₹${totalExpense}

// Current Balance: ₹${balance}

// Expense Categories:
// ${Object.entries(expenseCategories)
//   .map(([cat, amt]) => `${cat}: ₹${amt}`)
//   .join("\n")}

// Recent Income:
// ${incomes
//   .slice(-3)
//   .map(
//     (i) =>
//       `${i.source || "Income"}: ₹${i.amount}`
//   )
//   .join("\n")}

// Recent Expenses:
// ${expenses
//   .slice(-3)
//   .map(
//     (e) =>
//       `${e.category}: ₹${e.amount}`
//   )
//   .join("\n")}
// `;



// module.exports = router;
const express = require("express");
const router = express.Router();

const Groq = require("groq-sdk");

const Income = require("../models/Income");
const Expense = require("../models/Expense");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// ================= AI CHAT =================
router.post("/chat", async (req, res) => {

  try {

    const { message, history, userId } = req.body;

    // ================= FETCH USER DATA =================

    const incomes = await Income.find({
      user: userId,
    });

    const expenses = await Expense.find({
      user: userId,
    });


    // ================= CALCULATIONS =================

    const totalIncome = incomes.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const totalExpense = expenses.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const balance = totalIncome - totalExpense;


    // ================= CATEGORY ANALYSIS =================

    const expenseCategories = {};

    expenses.forEach((exp) => {

      if (!expenseCategories[exp.category]) {
        expenseCategories[exp.category] = 0;
      }

      expenseCategories[exp.category] += exp.amount;
    });


    // ================= SUMMARY =================

    const financeSummary = `
User Financial Data:

Total Income: ₹${totalIncome}

Total Expense: ₹${totalExpense}

Current Balance: ₹${balance}

Expense Categories:
${Object.entries(expenseCategories)
  .map(([cat, amt]) => `${cat}: ₹${amt}`)
  .join("\n")}
`;


    // ================= AI REQUEST =================

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [

          {
            role: "system",

            content: `
You are an AI Financial Advisor.

Use this financial data:

${financeSummary}

Provide:
- spending insights
- savings advice
- budgeting help
- financial analysis
`
          },

          ...(history || []),

          {
            role: "user",
            content: message,
          },
        ],
      });


    const reply =
      completion.choices[0]?.message?.content;

    res.json({ reply });

  } catch (error) {

    console.log("GROQ ERROR:", error);

    res.status(500).json({
      error: "AI error",
    });
  }
});

module.exports = router;