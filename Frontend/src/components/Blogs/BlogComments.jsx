import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const DisplayComments = ({ comments }) => {
  const [visibleComments, setVisibleComments] = useState(10);

  const handleLoadMore = () => {
    setVisibleComments((prevVisible) => prevVisible + 10);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {comments.length > 0 ? (
        <>
          {comments.slice(0, visibleComments).map((comment, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="flex items-start mb-2">
                {comment.user.avatar ? (
                  <img
                    src={comment.user.avatar}
                    alt={`${comment.user.name}'s avatar`}
                    className="w-12 h-12 rounded-full mr-3 border border-gray-300"
                  />
                ) : (
                  <FaUserCircle className="text-gray-600 w-12 h-12 mr-3" />
                )}
                <div>
                  <span className="font-semibold text-gray-900">
                    {comment.user.name || "Anonymous"}
                  </span>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {visibleComments < comments.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleLoadMore}
                className="text-gray-600 hover:underline focus:outline-none">
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default DisplayComments;
