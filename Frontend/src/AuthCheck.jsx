import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Importing as a default import

const checkLoggedIn = () => {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("token=")
  );

  if (tokenCookie !== undefined) {
    const token = tokenCookie.split("=")[1].trim();

    // Decode the token to get the user's ID (assuming the ID is stored in the token)
    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id; // Adjust based on your JWT structure
    return userId;
  }

  return null;
};

const AuthCheck = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for sidebar open/closed
  const userId = checkLoggedIn();

  useEffect(() => {
    if (!userId) {
      navigate("/landing"); // Redirect to the landing page if not logged in
    } else if (window.location.pathname === "/") {
      navigate(`/${userId}/dashboard`); // Redirect to dashboard if logged in and on the root path
    }
  }, [userId, navigate]);

  if (!userId) {
    return null; // Return nothing while the redirection is in progress
  }

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-grow p-4 overflow-auto transition-all duration-300 ${
          isOpen ? "ml-[250px]" : "ml-[80px]"
        }`}>
        <Outlet />{" "}
        {/* This will render the child routes, e.g., Dashboard, Blogs */}
      </div>
    </div>
  );
};

export default AuthCheck;
