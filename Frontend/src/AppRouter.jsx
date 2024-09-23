import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import Blogs from "./Pages/Blogs";
import BlogDetail from "./components/Blogs/BlogDetails"; // Import BlogDetail
import Saved from "./Pages/Saved";
import ProtectedRoute from "./AuthCheck";
import Attendance from "./components/Dashboard/AttendanceData";
import SavedBlogDetail from "./components/Blogs/SavedBlogDetail"; // Import SavedBlogDetail
const router = createBrowserRouter([
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/:id/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/:id/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id", // This should handle blog detail views
        element: <BlogDetail />,
      },
      {
        path: "/blogs/saved/:id", // This should handle blog detail views
        element: <SavedBlogDetail />,
      },
      {
        path: "/:id/saved",
        element: <Saved />,
      },
      {
        path: "/:id/attendance",
        element: <Attendance />,
      },
    ],
  },
]);

export default router;
