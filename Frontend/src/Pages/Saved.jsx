import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import SavedBlogBox from "../components/Blogs/SavedBlogBox";
import { getToken } from "../utils/checkAuth";

const Saved = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(8); // Number of blogs to display
  const userId = getToken()?._id;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://portfolify.onrender.com/user/${userId}/saved`
        );
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [userId]);

  useEffect(() => {
    const results = blogs.filter((blog) => {
      // Ensure title is a string before calling toLowerCase
      const title = blog.title || "";
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredBlogs(results);
  }, [searchQuery, blogs]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const loadMoreBlogs = () => {
    setDisplayCount(displayCount + 8); // Increase display count by 8
  };

  // Limit the number of displayed blogs to the current displayCount
  const displayedBlogs = filteredBlogs.slice(0, displayCount);

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="p-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search saved blogs..."
            className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-0 transition duration-300 ease-in-out"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 transition duration-300 ease-in-out" />
          <style>{`
            input:focus::placeholder {
              transform: scale(0.85);
              color: #4a5568; /* Adjust color if needed */
            }
            input::placeholder {
              transition: transform 0.3s ease, color 0.3s ease;
            }
          `}</style>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {displayedBlogs.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <SavedBlogBox blog={blog} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-4">
        {displayCount < filteredBlogs.length && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={loadMoreBlogs}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Saved;
