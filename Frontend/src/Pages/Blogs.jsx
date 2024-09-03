// Pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogBox from "../components/Blogs/BlogBox";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8001/blog/all"); // Adjust the API endpoint
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {blogs.map((blog) => (
        <BlogBox key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
