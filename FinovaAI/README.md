### AI-Powered Personal Finance Management System 

---

## 📌 Overview

Finova AI is a full-stack personal finance management application that helps users track income, expenses, savings, and financial trends.

Users can:

* Track income and expenses
* Monitor savings and balance
* Visualize spending trends using charts
* Categorize transactions
* View financial insights
* Chat with an AI financial assistant


---

## 🏗️ Project Structure

```text
FinovaAI/
├── backend/
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Income.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── income.js
│   │   ├── expenses.js
│   │   ├── profile.js
│   │   └── chat.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Income.jsx
│   │   │   ├── Expenses.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── AIChat.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Features

### 🔐 Authentication

* User Signup
* User Login
* JWT Authentication
* Protected Routes

### 💵 Income Management

* Add income records
* Edit income entries
* Delete income entries
* View total income

### 💸 Expense Management

* Add expenses
* Categorize expenses
* Edit expenses
* Delete expenses
* Track total spending

### 📊 Dashboard Analytics

* Total Income
* Total Expenses
* Current Balance
* Saving Rate
* Monthly Trends
* Yearly Trends
* Expense Category Pie Chart

### 🤖 AI Financial Assistant

* Personalized financial insights
* Budget recommendations
* Spending analysis
* Financial health suggestions

### 👤 Profile Management

* Update user information
* Change personal details
* Secure account management

### 📱 Responsive Design

* Desktop support
* Tablet support
* Mobile-friendly interface

---

## 🛠️ Tech Stack

| Layer               | Technology           |
| ------------------- | -------------------- |
| Frontend            | React.js + Vite      |
| Styling             | CSS + Tailwind CSS   |
| Charts              | Recharts             |
| HTTP Client         | Axios                |
| Backend             | Node.js + Express.js |
| Database            | MongoDB Atlas        |
| Authentication      | JWT                  |
| Password Encryption | bcryptjs             |
| AI Integration      | OpenAI API           |
| Deployment          | Vercel + Render      |

---

## ⚙️ Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Create .env File

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

OPENAI_API_KEY=your_openai_api_key
```

### Run Backend

```bash
npm run dev
```

## ⚙️ Frontend Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Create .env File

```env
VITE_API_URL=http://localhost:5000/api
```

### Run Frontend

```bash
npm run dev
```

## 🔌 API Routes

### Authentication

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/auth/signup |
| POST   | /api/auth/login  |

### Income

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/income     |
| POST   | /api/income     |
| PUT    | /api/income/:id |
| DELETE | /api/income/:id |

### Expenses

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/expenses     |
| POST   | /api/expenses     |
| PUT    | /api/expenses/:id |
| DELETE | /api/expenses/:id |

### Profile

| Method | Endpoint     |
| ------ | ------------ |
| GET    | /api/profile |
| PUT    | /api/profile |

### AI Chat

| Method | Endpoint  |
| ------ | --------- |
| POST   | /api/chat |

---

This project is developed for educational and portfolio purposes.
