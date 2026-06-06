# 🛒 MERN E-Commerce Website

### Full Stack E-Commerce Platform | React.js + Node.js + Express.js + MongoDB

---

## 📌 Overview

This project is a full-stack E-Commerce website built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

---

## 🏗️ Project Structure

```text
ecommerce/
│
├── client/                          # React Frontend
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Product.jsx
│       │   ├── ProductDetail.jsx
│       │   ├── ProductList.jsx
│       │   ├── OrderList.jsx
│       │   └── Admin.jsx
│       │
│       ├── App.jsx
│       ├── App.css
│       ├── index.js
│       ├── index.css
│       ├── logo.svg
│       ├── reportWebVitals.js
│       └── setupTests.js
│
├── server/                          # Express Backend
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## 🚀 Features

### 👤 User Features

* User Registration
* User Login
* JWT Authentication
* Browse Products
* View Product Details
* Add Products to Cart
* Place Orders


### 🛍️ Product Features

* Product Listing
* Product Details Page
* Product Search
* Product Management

### 📦 Order Features

* Create Orders
* View Orders
* Track Order Status
* Order Management

### 🔐 Admin Features

* Admin Dashboard
* Manage Products
* Manage Orders
* Manage Users

---

## 🛠️ Tech Stack

| Layer               | Technology       |
| ------------------- | ---------------- |
| Frontend            | React.js         |
| Styling             | CSS3             |
| Routing             | React Router DOM |
| HTTP Client         | Axios            |
| Backend             | Node.js          |
| Framework           | Express.js       |
| Database            | MongoDB          |
| ODM                 | Mongoose         |
| Authentication      | JWT              |
| Password Encryption | bcryptjs         |

---

## ⚙️ Backend Setup

### Install Dependencies

```bash
cd server
npm install
```

### Create .env File

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### Run Backend

```bash
npm start
```

## ⚙️ Frontend Setup

### Install Dependencies

```bash
cd client
npm install
```

### Start Frontend

```bash
npm start
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | /api/users/register | Register User |
| POST   | /api/users/login    | Login User    |

---

### Products

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /api/products     | Get All Products    |
| GET    | /api/products/:id | Get Product Details |
| POST   | /api/products     | Create Product      |
| PUT    | /api/products/:id | Update Product      |
| DELETE | /api/products/:id | Delete Product      |

---

### Orders

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/orders     | Get Orders        |
| POST   | /api/orders     | Create Order      |
| GET    | /api/orders/:id | Get Order Details |
| DELETE | /api/orders/:id | Delete Order      |

---

## 🔐 Authentication Flow

1. User Registers
2. Password is encrypted using bcryptjs
3. User Logs In
4. JWT Token is generated
5. Protected routes verify token using middleware
6. Authorized users can access secured resources

---

## 📱 Application Pages

### Home Page

* Featured products
* Product listings
* Navigation

### Product Details Page

* Product information
* Price details
* Purchase options

### Login Page

* User authentication

### Register Page

* New user registration

### Order List Page

* User order history

### Admin Dashboard

* Product management
* Order management
* User management

---


## 🎯 Future Improvements

* Shopping Cart
* Wishlist
* Payment Gateway Integration
* Product Reviews & Ratings
* Coupon System
* Email Notifications
* Order Tracking
* Dark Mode
* Multi-Vendor Support

---


This project is developed for educational and portfolio purposes.

---


