# 🚀 CivicAI – AI-Powered Civic Issue Reporting Platform





\

CivicAI is an AI-powered civic issue reporting platform that simplifies the process of reporting public infrastructure problems. Citizens can submit issues such as potholes, garbage accumulation, water leakage, damaged streetlights, and other civic concerns, while an AI assistant powered by Google Gemini helps users describe issues and automatically analyzes each report.

The platform streamlines issue management for both citizens and administrators through intelligent categorization, dashboards, analytics, and real-time tracking.

---

# 🌍 Problem Statement

Citizens often struggle to report civic issues efficiently due to complicated reporting systems, manual categorization, and lack of transparency in issue tracking.

CivicAI addresses these challenges by combining Artificial Intelligence with an intuitive reporting platform that automatically understands reported issues, classifies them, and routes them to the appropriate government department.

---

# ✨ Key Features

## 👤 User Features

* Secure JWT Authentication
* HttpOnly Cookie-based Authentication
* Role-Based Access Control
* User Registration & Login
* Profile Management
* Create Civic Issues
* Edit Issues
* Delete Issues
* Upload Issue Images using Cloudinary
* View Personal Issues
* View Detailed Issue Information
* Search Issues
* Filter Issues
* Personal Dashboard
* Leaderboard System

---

## 🤖 AI-Powered Assistant

Google Gemini AI is integrated into the issue reporting workflow.

The AI assistant helps users before submitting an issue by:

* Understanding natural language descriptions
* Categorizing issues automatically
* Assigning priority levels
* Identifying the responsible government department
* Generating concise issue summaries
* Providing citizen recommendations
* Suggesting government actions

This significantly reduces manual work while improving reporting accuracy.

---

## 📊 Dashboard & Analytics

### User Dashboard

* Total Issues
* Pending Issues
* In Progress Issues
* Resolved Issues
* Category Distribution Charts

### Admin Dashboard

* View All Reported Issues
* Manage Issue Status
* Delete Issues
* Dashboard Analytics
* Status Distribution Charts
* Department Distribution Charts
* Category Distribution Charts
* User Management

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Cookie Parser
* Helmet
* Compression
* Multer
* Cloudinary

## Artificial Intelligence

* Google Gemini API

---

# 📂 Project Structure

```
CivicAI
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── components
│   ├── context
│   ├── pages
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/CivicAI.git
```

```bash
cd CivicAI
```

---

## Install Backend

```bash
cd backend
npm install
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

# 🔑 Environment Variables

## Backend (.env)

```
PORT
MONGODB_URI
JWT_SECRET
GEMINI_API_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
FRONTEND_URL
NODE_ENV
```

## Frontend (.env)

```
VITE_API_URL
```

---

# ▶️ Running the Project

## Backend

```bash
npm start
```

or

```bash
npm run dev
```

## Frontend

```bash
npm run dev
```

---

# ☁️ Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

# 🤖 AI Workflow

1. User starts the AI chatbot.
2. The chatbot collects issue details through conversation.
3. Google Gemini analyzes the information.
4. The AI automatically:

   * Categorizes the issue
   * Assigns priority
   * Selects the responsible department
   * Generates an issue summary
   * Provides citizen guidance
   * Suggests government actions
5. The issue is submitted with AI-generated insights.

---

# 📈 Future Enhancements

* Real-time notifications
* Multi-language support
* Mobile application
* GIS-based issue visualization
* AI duplicate issue detection
* Predictive civic analytics

---

# 👨‍💻 Author

**Kruparthsinh Kher**

GitHub: https://github.com/Kruparth08

---

# 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub!
