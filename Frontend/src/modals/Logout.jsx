import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: isOpen ? 1 : 0.9 }}
        exit={{ scale: 0.9 }}>
        <h2 className="text-lg sm:text-xl font-bold mb-4">Logout</h2>
        <p className="text-sm sm:text-base mb-6">
          Are you sure you want to log out?
        </p>
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300 text-sm">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 text-sm">
            <div className="flex items-center justify-center">
              <FaSignOutAlt className="mr-1" /> Logout
            </div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LogoutModal;
