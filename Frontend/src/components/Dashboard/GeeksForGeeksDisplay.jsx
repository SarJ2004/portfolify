import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrophy, FaRegClock, FaUserAlt } from "react-icons/fa";
import { GiCircuitry } from "react-icons/gi";

const GeeksForGeeksUserInfo = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/gfgapi/${username}`);

        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <LoadingIndicator />;
  if (error) return <div className="text-red-600 text-center">{error}</div>;
  if (!userData) return <div className="text-center">No data available</div>;

  const {
    info,
    solvedStats: { basic, easy, medium, hard },
  } = userData;

  return (
    <div className="max-w-lg mx-auto ">
      <div className="flex items-center mb-6">
        <img
          src={info.profilePicture}
          alt={`${info.userName}'s profile`}
          className="w-20 h-20 rounded-full border-4 border-gray-200"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{info.userName}</h2>
          <p className="text-gray-600">{info.institution}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Coding Stats
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <FaTrophy className="text-yellow-500 mr-2" />
            <strong>Institute Rank:</strong> {info.instituteRank}
          </li>
          <li className="flex items-center">
            <FaRegClock className="text-blue-500 mr-2" />
            <strong>Current Streak:</strong> {info.currentStreak}
          </li>
          <li className="flex items-center">
            <FaRegClock className="text-green-500 mr-2" />
            <strong>Max Streak:</strong> {info.maxStreak}
          </li>
          <li className="flex items-center">
            <GiCircuitry className="text-purple-500 mr-2" />
            <strong>Coding Score:</strong> {info.codingScore}
          </li>
          <li className="flex items-center">
            <FaUserAlt className="text-red-500 mr-2" />
            <strong>Total Problems Solved:</strong> {info.totalProblemsSolved}
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Problems Solved
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2" />
            <strong>Basic:</strong> {basic.count}
          </li>
          <li className="flex items-center">
            <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2" />
            <strong>Easy:</strong> {easy.count}
          </li>
          <li className="flex items-center">
            <span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-2" />
            <strong>Medium:</strong> {medium.count}
          </li>
          <li className="flex items-center">
            <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2" />
            <strong>Hard:</strong> {hard.count}
          </li>
        </ul>
      </div>
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

export default GeeksForGeeksUserInfo;
