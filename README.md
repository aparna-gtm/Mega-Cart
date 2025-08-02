# 🌍 MegaCart – E-Commerce Website

**MegaCart** is a full-stack e-commerce web application where users can browse a wide range of products, manage their shopping cart, and proceed through a mock checkout experience. Designed with a focus on simplicity and clean UI, MegaCart is ideal for learners and developers exploring modern web development fundamentals.

---

## 🚀 Live Demo

🔗 **[Visit MegaCart Live](https://mega-cart-cf2a.onrender.com)**

---

## 🖼️ Features

🛍️ Browse a variety of products with details  
🛒 Add to Cart / Remove from Cart / View Cart  
💸 Dummy checkout flow with test payment section  
🔐 Environment variables handled using `.env`  
🧑‍💻 Clean and responsive UI built with Bootstrap  
🧠 Modular file structure and clear code practices  
📁 Neatly structured routes and backend logic  

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js
- **Templating Engine:** EJS 
- **Database:** MongoDB 
- **Environment Management:** dotenv
- **Version Control:** Git, GitHub
- **Deployment:** Render

---

🗂️ Folder Structure
megacart/
├── public/           #  For static assets like images, CSS, and client-side JS
├── routes/           #  Contains route files (e.g., productRoutes.js, cartRoutes.js)
├── views/            #  Holds EJS or HTML templates (if using EJS as view engine)
├── controllers/      #  Logic separated from routes (helps modularity)
├── models/           #  MongoDB/Mongoose schemas (like Product.js, User.js)
├── .env              #  Environment variables (keep this in .gitignore)
├── .gitignore        #  Add node_modules/, .env, and other sensitive files here
├── package.json      #  Project metadata, scripts, and dependencies
├── server.js / app.js#  Main entry point (usually where Express is set up)
└── README.md         #  Describes the project and setup instructions

