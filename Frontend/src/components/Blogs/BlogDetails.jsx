import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Shimmer } from "react-shimmer";
import { getToken } from "../../utils/checkAuth";
import DisplayComments from "./BlogComments";

const BlogDetail = () => {
  console.log(getToken());
  const { id } = useParams();
  const userId = getToken()._id;
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/blog/${id}`, {
          withCredentials: true,
        });

        // Simulate a delay to show the shimmer effect
        setTimeout(() => {
          setBlog(response.data);
          setComments(response.data.comments);
        }, 2000); // 2-second delay
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8001/blog/comment/${id}`,
        {
          withCredentials: true,
          content: commentContent,
        }
      );

      // Add the new comment to the comments array
      setComments([...comments, response.data.comment]);
      setCommentContent(""); // Clear the comment box
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!blog) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <Shimmer width={150} height={30} className="mb-4" />{" "}
        {/* Shimmer for title */}
        <Shimmer width="100%" height={250} className="mb-4" />{" "}
        {/* Shimmer for cover image */}
        <Shimmer width={100} height={20} className="mb-4" />{" "}
        {/* Shimmer for author */}
        <Shimmer width="100%" height={400} /> {/* Shimmer for blog content */}
      </div>
    );
  }

  const authorName = blog.author ? blog.author.name : "Unknown author";

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Back Arrow */}
      <button
        onClick={() => navigate(`/${userId}/blogs`)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <FaArrowLeft className="mr-2" />
        Back to Blogs
      </button>

      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-64 object-cover mb-4 rounded-lg shadow-md"
      />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">by {authorName}</p>
      <div className="prose">
        <p>{blog.content}</p>
      </div>

      {/* Comment Box */}
      <form onSubmit={handleCommentSubmit} className="mt-6">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-800">
          Post Comment
        </button>
      </form>

      {/* Display Comments */}
      <DisplayComments comments={comments} />
    </div>
  );
};

export default BlogDetail;
