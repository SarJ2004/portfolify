import React, { useEffect, useState } from "react";
import { FaTrophy, FaBuilding, FaUser } from "react-icons/fa";

const CodeforcesUserInfo = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.info?handles=${username}`
        );
        const data = await response.json();

        if (data.status === "OK") {
          setUserData(data.result[0]);
        } else {
          setError("Error fetching user data");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <LoadingIndicator />;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="max-w-md mx-auto ">
      {userData ? (
        <div className="flex flex-col items-center text-center">
          <img
            src={userData.avatar}
            alt={userData.handle}
            className="w-28 h-28 rounded-full border-4 border-gray-300 mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {userData.handle}
          </h1>
          <p className="text-gray-700 flex items-center mb-2">
            <FaTrophy className="text-yellow-500 mr-2" />
            <span className="font-semibold">Rating:</span> {userData.rating}
          </p>
          <p className="text-gray-700 flex items-center mb-2">
            <FaTrophy className="text-blue-500 mr-2" />
            <span className="font-semibold">Rank:</span> {userData.rank}
          </p>
          <p className="text-gray-700 flex items-center mb-2">
            <FaTrophy className="text-green-500 mr-2" />
            <span className="font-semibold">Max Rating:</span>{" "}
            {userData.maxRating}
          </p>
          <p className="text-gray-700 flex items-center mb-2">
            <FaTrophy className="text-red-500 mr-2" />
            <span className="font-semibold">Max Rank:</span> {userData.maxRank}
          </p>
          {userData.organization && (
            <p className="text-gray-700 flex items-center mb-2">
              <FaBuilding className="text-gray-600 mr-2" />
              <span className="font-semibold">Organization:</span>{" "}
              {userData.organization}
            </p>
          )}
        </div>
      ) : (
        <div className="text-center">No user data available</div>
      )}
    </div>
  );
};

// Loading Indicator Component
const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent border-solid rounded-full animate-spin" />
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  );
};

export default CodeforcesUserInfo;
