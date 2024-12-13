# Portfolify

Potfolify is a comprehensive application designed to help students efficiently manage their personal and academic information. From coding profiles and attendance records to personal blogs and achievements, Potfolify brings everything into one organized platform.

## Features

- Manage coding profile information from various platforms.
- Track and update attendance records.
- Create, edit, and organize personal blogs.

---

## Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Cookies, JWT, Bcrypt

---

## Installation

### Prerequisites

- Node.js installed on your system.
- MongoDB database set up (local or cloud).

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/SarJ2004/portfolify.git
   cd portfolify
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` folder.
   - Add the following variables:
     ```
     PORT = 'your port'
     MONGO_URI= 'your mongoDB URI'
     JWT_SECRET= 'your JWT secret'
     MONGO_PASSWORD= 'your mongoDB password'
     MONGOSH  = 'your mongoDB shell run command'
     MONGOSH_URI = 'your mongoDB shell URI'
     MONGOSH_USERNAME= 'your mongoDB shell username'
     MONGOSH_PASSWORD = 'your mongoDB shell password'
     CLOUDINARY_CLOUD_NAME=	'your cloudinary cloud name'
     CLOUDINARY_API_KEY= 'your cloudinary api-key'
     CLOUDINARY_API_SECRET= 'your cloudinary api-secret'
     ```
4. Start the development server:

   ```bash
   # In the Backend folder
   npm start
   npm run db
   enter password
   # In the Frontend folder
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:8001` or, ctrl+right-click on the link in the Frontend folder's CLI.

---

## API Endpoints

| Method | Endpoint                        | Description                         |
| ------ | ------------------------------- | ----------------------------------- |
| GET    | /api/attendance/:id             | Fetch attendance by user ID         |
| POST   | /api/attendance/:id             | Set attendance for a user           |
| POST   | /api/auth/signup                | Handle user signup                  |
| POST   | /api/auth/login                 | Handle user login                   |
| POST   | /api/avatar/:id                 | Upload user avatar                  |
| GET    | /api/blog/all                   | Fetch all blogs                     |
| GET    | /api/blog/:id                   | Fetch a single blog by ID           |
| POST   | /api/blog/:id                   | Create a new blog                   |
| POST   | /api/blog/comment/:id           | Add a comment to a blog (auth req.) |
| POST   | /api/blog/banner/:id            | Upload a banner for a blog          |
| POST   | /api/blog/:userId/save/:blogId  | Save a blog for a user              |
| GET    | /api/blog/:userId/saved/:blogId | Check if a blog is saved by a user  |
| POST   | /api/blog/:blogId/likes         | Increment likes on a blog           |
| POST   | /api/blog/:blogId/dislikes      | Increment dislikes on a blog        |
| GET    | /api/user/:id                   | Fetch user information by ID        |
| PATCH  | /api/user/:id                   | Update user information by ID       |
| GET    | /api/user/:userId/saved         | Fetch saved blogs for a user        |

---

## Folder Structure

```
potfolify/
│
├── Backend/                # Express.js server
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Middleware functions
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Service utility functions
│   ├── .env                # Environment variables
│   ├── connect.js          # Database connection file
│   ├── dbScript.js         # Database seeding script
│   ├── index.js            # Entry point for the backend
│   ├── package.json        # Backend dependencies and scripts
│   ├── package-lock.json   # Backend dependency lock file
│   └── sample.env          # Example environment variables
│
├── Frontend/               # React app
│   ├── src/
│   │   ├── assets/         # Static assets (images, icons, etc.)
│   │   ├── components/     # Reusable components
│   │   ├── modals/         # Modal components
│   │   ├── Pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.css         # Global CSS styles
│   │   ├── App.jsx         # Main app file
│   │   ├── AppRouter.jsx   # Application router
│   │   ├── AuthCheck.jsx   # Authentication check component
│   │   ├── BottomTabs.jsx  # Bottom navigation tabs
│   │   ├── main.jsx        # Entry point for the React app
│   │   └── Sidebar.jsx     # Sidebar component
│   ├── public/             # Public assets
│   ├── .gitignore          # Files/folders to ignore
│   ├── eslint.config.js    # ESLint configuration
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies and scripts
│   ├── package-lock.json   # Frontend dependency lock file
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── vite.config.js      # Vite configuration file
│   └── README.md           # Documentation
├── .gitignore              # Files/folders to ignore globally
├── package.json            # Root dependencies and scripts
└── README.md               # Documentation
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

## License

This project is licensed under the MIT License.
