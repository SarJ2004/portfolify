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

  // First try to get token from cookies
  if (tokenCookie && tokenCookie.includes("=")) {
    const token = tokenCookie.split("=")[1]?.trim();

    if (token && token !== "") {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        console.log("Decoded user ID from cookie:", userId);
        return userId;
      } catch (error) {
        console.error("Error decoding token from cookie:", error);
      }
    }
  }

  // Fallback: try to get token from localStorage
  const localToken = localStorage.getItem("token");
  console.log("Token from localStorage:", localToken);

  if (localToken && localToken !== "null" && localToken !== "") {
    try {
      const decodedToken = jwtDecode(localToken);
      const userId = decodedToken._id;
      console.log("Decoded user ID from localStorage:", userId);
      return userId;
    } catch (error) {
      console.error("Error decoding token from localStorage:", error);
      localStorage.removeItem("token"); // Remove invalid token
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
