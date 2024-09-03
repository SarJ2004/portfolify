import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaTachometerAlt,
  FaBlog,
  FaBookmark,
  FaClipboardList,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "./modals/Logout";
import EditDetailsModal from "./modals/EditDetails";
import { getToken } from "./utils/checkAuth.js"; // Import the utility function

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = getToken()._id;
  useEffect(() => {
    const fetchUserInfo = async () => {
      // Get the user ID from the token
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:8001/user/${userId}`,
            {
              withCredentials: true,
            }
          );
          // console.log(response.data);
          setUser(response.data);
        } catch (error) {
          setError("Failed to fetch user info");
          console.error("Error fetching user info:", error);
        }
      } else {
        setError("User ID not found");
      }
    };

    fetchUserInfo();
  }, [navigate, userId]);

  const sidebarVariants = {
    open: {
      width: "250px",
      opacity: 1,
      transition: { width: { duration: 0.3 }, opacity: { duration: 0.3 } },
    },
    closed: {
      width: "80px",
      opacity: 1,
      transition: { width: { duration: 0.3 }, opacity: { duration: 0.3 } },
    },
  };

  const textVariants = {
    open: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    closed: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    closed: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const avatarVariants = {
    open: { width: "6rem", height: "6rem", transition: { duration: 0.3 } },
    closed: { width: "4rem", height: "4rem", transition: { duration: 0.3 } },
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleAvatarUpdate = (newAvatar) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: newAvatar,
    }));
  };

  const handleAvatarClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-screen bg-gray-800 text-white p-4 z-40 sidebar md:w-64 sm:w-48 ">
        <div
          className={`flex flex-col items-center ${isOpen ? "pt-12" : "pt-8"}`}>
          <motion.div
            variants={avatarVariants}
            className="rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer"
            onClick={handleAvatarClick}>
            <img
              src={user?.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </motion.div>
          <div className="text-white text-xs md:text-base">{user?.name}</div>
          {isOpen && (
            <button
              onClick={handleEditProfile}
              className="mt-4 text-sm bg-blue-500 px-4 py-2 rounded-lg text-white transition duration-300 hover:bg-blue-600">
              Edit Profile
            </button>
          )}
        </div>
        <div className="flex justify-between items-center px-4 mt-4">
          <motion.h1 variants={textVariants} className="text-2xl font-bold">
            Menu
          </motion.h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none transition-transform transform hover:scale-110 absolute top-4 right-4 z-50">
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        <nav className="mt-8">
          <motion.ul className="space-y-4">
            {[
              {
                to: `/${userId}/dashboard`,
                icon: <FaTachometerAlt />,
                label: "Dashboard",
              },
              {
                to: `/${userId}/attendance`,
                icon: <FaClipboardList />,
                label: "Attendance",
              },
              { to: `/${userId}/blogs`, icon: <FaBlog />, label: "Blogs" },
              { to: `/${userId}/saved`, icon: <FaBookmark />, label: "Saved" },
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="relative flex items-center py-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-700 group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  paddingLeft: isOpen ? "1rem" : "0.5rem",
                  paddingRight: isOpen ? "1rem" : "0.5rem",
                }}>
                <Link
                  to={item.to}
                  className="flex items-center w-full space-x-4"
                  style={{ pointerEvents: isOpen ? "auto" : "auto" }}>
                  <motion.div
                    className="text-xl"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isOpen ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}>
                    {item.icon}
                  </motion.div>
                  <motion.span
                    className={`ml-4 ${!isOpen ? "hidden sm:inline" : ""}`}
                    variants={textVariants}>
                    {item.label}
                  </motion.span>
                </Link>
                <AnimatePresence>
                  {!isOpen && hoveredIndex === index && (
                    <motion.div
                      key={`tooltip-${index}`}
                      className="absolute left-full top-1/2 transform -translate-x-2 -translate-y-1/2 bg-gray-900 text-white p-2 rounded-md text-sm whitespace-nowrap z-50 hidden sm:block"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}>
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
        <div
          className="absolute bottom-4 right-4"
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition duration-300">
            <FaSignOutAlt size={20} />
          </button>
          <AnimatePresence>
            {isLogoutHovered && (
              <motion.div
                className="absolute left-full top-1/2 transform -translate-x-2 -translate-y-1/2 bg-gray-900 text-white p-2 rounded-md text-sm whitespace-nowrap z-50 hidden sm:block"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}>
                Logout
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />
      <EditDetailsModal
        isOpen={isEditProfileModalOpen}
        onClose={closeEditProfileModal}
        onAvatarUpdate={handleAvatarUpdate}
        user={user}
      />
    </>
  );
};

export default Sidebar;
