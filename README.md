# MyTodo - Full Stack Todo Application

A modern, full-stack todo application built with React, Node.js, Express, and MongoDB. This application provides a complete task management solution with user authentication, CRUD operations, and a responsive user interface.

## 🚀 Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Todo Management**: Create, read, update, and delete todos
- **Priority Levels**: Organize tasks by priority (Low, Medium, High)
- **Due Dates**: Set and track due dates for your tasks
- **Task Completion**: Mark tasks as completed with visual feedback
- **Responsive Design**: Clean, modern UI that works on all devices
- **Real-time Updates**: Instant feedback on all operations
- **Form Validation**: Client and server-side validation for data integrity

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **JWT** - JSON Web Tokens for authentication
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/mytodo-app.git
cd mytodo-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory with the following variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mytodo
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

### 5. Start the Application

#### Start Backend Server
```bash
# From backend directory
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server
```bash
# From frontend directory
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

## 📁 Project Structure

```

mytodo-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── todos.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Todo Routes
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a specific todo
- `DELETE /api/todos/:id` - Delete a specific todo

## 💾 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Todo Model
```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  priority: String (enum: 'low', 'medium', 'high'),
  dueDate: Date (optional),
  user: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Features

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Visual Priority Indicators**: Color-coded priority levels
- **Interactive Elements**: Hover effects and smooth transitions
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during async operations

## 🔐 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with JSON Web Tokens
- **Protected Routes**: Frontend and backend route protection
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin resource sharing

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set up your production MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables in your hosting platform
3. Deploy the backend code
4. Update the CORS origin to your frontend URL

### Frontend Deployment (Vercel/Netlify)
1. Update the API URL in the frontend to point to your deployed backend
2. Build the project: `npm run build`
3. Deploy the built files to your hosting platform

## 📱 Screenshots
![Screenshot 2025-07-02 131149](https://github.com/user-attachments/assets/92bd47af-b8ae-4546-ac6a-1c25abf9ad06)
![Screenshot 2025-07-02 131149](https://github.com/user-attachments/assets/2b152083-2d9b-478c-9cd9-894e5a522090)



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


⭐ Star this repository if you found it helpful!
