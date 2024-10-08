import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Shimmer } from "react-shimmer";
import { getToken } from "../../utils/checkAuth";
import DisplayComments from "./BlogComments";

const BlogDetail = () => {
  const { id } = useParams();
  const userId = getToken()?._id;
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://portfolify-4bjg.onrender.com/blog/${id}`,
          {
            withCredentials: true,
          }
        );
        setBlog(response.data);
        setComments(response.data.comments);

        const savedResponse = await axios.get(
          `https://portfolify-4bjg.onrender.com/blog/${userId}/saved/${id}`,
          { withCredentials: true }
        );
        setIsSaved(savedResponse.data.saved);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id, userId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://portfolify-4bjg.onrender.com/blog/comment/${id}`,
        { content: commentContent },
        { withCredentials: true }
      );

      setComments([response.data.comment, ...comments]);
      setCommentContent("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleSaveToggle = async () => {
    try {
      const response = await axios.post(
        `https://portfolify-4bjg.onrender.com/blog/${userId}/save/${id}`,
        {},
        { withCredentials: true }
      );
      setIsSaved(response.data.saved);
    } catch (error) {
      console.error("Error toggling save status:", error);
    }
  };

  if (!blog) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <Shimmer width={150} height={30} className="mb-4" />
        <Shimmer width="100%" height={250} className="mb-4" />
        <Shimmer width={100} height={20} className="mb-4" />
        <Shimmer width="100%" height={400} />
      </div>
    );
  }

  const authorName = blog.author ? blog.author.name : "Unknown author";

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(`/${userId}/blogs`)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <FaArrowLeft className="mr-2" />
        Back to Blogs
      </button>

      <div className="mb-4 flex flex-col items-center">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-64 object-cover mb-4 rounded-lg shadow-md"
        />
        <div className="flex justify-between items-center w-full px-4">
          <h1 className="text-3xl font-bold mb-2 flex-1">{blog.title}</h1>
          <button
            onClick={handleSaveToggle}
            className={`ml-4 p-2 rounded-full ${
              isSaved ? "text-yellow-500" : "text-gray-500"
            }`}
            aria-label={isSaved ? "Unsave Blog" : "Save Blog"}>
            {isSaved ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">by {authorName}</p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-sm text-white">
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-full">
          <p>{blog.content}</p>
        </div>
      </div>

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

      <DisplayComments comments={comments} />
    </div>
  );
};

export default BlogDetail;
