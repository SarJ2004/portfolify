import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Importing as a default import

const checkLoggedIn = () => {
  console.log("All cookies:", document.cookie);
  const cookies = document.cookie.split(";");
  console.log("Split cookies:", cookies);
  
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("token=")
  );
  console.log("Token cookie:", tokenCookie);

  if (tokenCookie !== undefined) {
    const token = tokenCookie.split("=")[1].trim();

    try {
      // Decode the token to get the user's ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      console.log("Decoded user ID:", userId);
      return userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  return null;
};

const AuthCheck = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Add a small delay to ensure cookies are available
    const timer = setTimeout(() => {
      const id = checkLoggedIn();
      setUserId(id);
      setIsLoading(false);

      if (!id) {
        navigate("/landing");
      } else if (window.location.pathname === "/") {
        navigate(`/${id}/dashboard`);
      }
    }, 200); // 200ms delay

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading || !userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
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
