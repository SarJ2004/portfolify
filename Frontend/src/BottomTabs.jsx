// BottomTabs.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBlog,
  FaBookmark,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

const BottomTabs = ({ id, onLogout }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-2 flex justify-around items-center z-40">
      <Link
        to={`/${id}/dashboard`}
        className="flex flex-col items-center text-xs">
        <FaTachometerAlt size={20} />
        <span>Dashboard</span>
      </Link>
      <Link
        to={`/${id}/attendance`}
        className="flex flex-col items-center text-xs">
        <FaClipboardList size={20} />
        <span>Attendance</span>
      </Link>
      <Link to={`/${id}/blogs`} className="flex flex-col items-center text-xs">
        <FaBlog size={20} />
        <span>Blogs</span>
      </Link>
      <Link to={`/${id}/saved`} className="flex flex-col items-center text-xs">
        <FaBookmark size={20} />
        <span>Saved</span>
      </Link>
      <button
        onClick={onLogout}
        className="flex items-center justify-center text-xs bg-red-500 p-2 rounded-full hover:bg-red-600 transition duration-300">
        <FaSignOutAlt size={20} />
      </button>
    </div>
  );
};

export default BottomTabs;
