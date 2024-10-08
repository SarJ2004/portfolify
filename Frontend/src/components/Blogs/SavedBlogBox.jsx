/* eslint-disable react/prop-types */
// components/BlogBox.jsx

import { Link } from "react-router-dom";

const SavedBlogBox = ({ blog }) => {
  const authorName = blog.author?.name || "Unknown author";
  console.log("blog", blog);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blogs/saved/${blog._id}`}>
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{blog.title}</h3>
          <p className="text-gray-600">by {authorName}</p>
        </div>
      </Link>
    </div>
  );
};

export default SavedBlogBox;
