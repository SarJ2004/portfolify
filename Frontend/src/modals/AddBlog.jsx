import { useState } from "react";
import axios from "axios";

function AddBlog({ authorId, onClose, onBlogCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null); // State for the cover image file

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]); // Update cover image state with the selected file
  };

  const createBlog = async () => {
    try {
      const blogData = {
        title,
        content,
        author: authorId,
        tags: tags.split(","),
      };

      const response = await axios.post(
        `https://portfolify.onrender.com/blog/${authorId}`,
        blogData
      );

      if (response.status === 201) {
        return response.data.blogId; // Assuming the response contains the blogId
      }
    } catch (error) {
      console.error(
        "Error creating blog:",
        error.response?.data || error.message
      );
      throw new Error("Failed to create blog");
    }
  };

  const uploadCoverImage = async (blogId) => {
    const formData = new FormData();
    if (coverImage) {
      formData.append("coverImage", coverImage); // Field name must match Multer's expected field name
    }

    try {
      const response = await axios.post(
        `https://portfolify.onrender.com/blog/banner/${blogId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Success - do something, e.g., show a success message
        alert("Blog created and cover image uploaded successfully!");
        onBlogCreated(); // Notify the parent component
        onClose(); // Close modal
      }
    } catch (error) {
      console.error(
        "Error uploading cover image:",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const blogId = await createBlog(); // Create the blog and get its ID
      if (coverImage) {
        await uploadCoverImage(blogId); // Upload the cover image with the blog ID
      } else {
        alert("Blog created successfully!");
        onBlogCreated(); // Notify the parent component
        onClose(); // Close modal
      }
    } catch (error) {
      console.error(
        "Error creating blog or uploading cover image:",
        error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto relative">
        <button
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl"
          onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Create a New Blog
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              value={content}
              name="content"
              onChange={(e) => setContent(e.target.value)}
              required
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              value={tags}
              name="tags"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Cover Image
            </label>
            <input
              type="file"
              name="coverImage"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 shadow-sm">
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
