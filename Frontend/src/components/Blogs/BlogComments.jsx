import { FaUserCircle } from "react-icons/fa";

const DisplayComments = ({ comments }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <FaUserCircle className="text-gray-600 mr-2" />
              <span className="font-semibold">
                {comment.user.name || "Anonymous"}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
            <p className="text-gray-500 text-sm mt-2">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default DisplayComments;
