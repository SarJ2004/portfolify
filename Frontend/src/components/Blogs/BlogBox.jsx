import { Link } from "react-router-dom";

const BlogBox = ({ blog }) => {
  const authorName = blog.author?.name || "Unknown author";

  const maxLength = 100;

  const truncatedContent =
    blog.content.length > maxLength
      ? blog.content.substring(0, maxLength) + "....."
      : blog.content;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/blogs/${blog._id}`}>
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{blog.title}</h3>
          <p className="text-gray-600">by {authorName}</p>
          <p className="text-gray-800 mt-2">{truncatedContent}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogBox;
