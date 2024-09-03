import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

const CircularProgressChart = ({ username }) => {
  const [data, setData] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://alfa-leetcode-api.onrender.com/userProfile/${username}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(
          `https://alfa-leetcode-api.onrender.com/${username}`
        );
        const result = await response.json();
        setAvatar(result.avatar);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, [username]);

  if (!data || !avatar) {
    return <LoadingIndicator />;
  }

  const {
    easySolved,
    totalEasy,
    mediumSolved,
    totalMedium,
    hardSolved,
    totalHard,
    ranking,
  } = data;

  const easyPercentage = (easySolved / totalEasy) * 100;
  const mediumPercentage = (mediumSolved / totalMedium) * 100;
  const hardPercentage = (hardSolved / totalHard) * 100;

  const chartStyles = (color) =>
    buildStyles({
      pathColor: color,
      textColor: color,
      trailColor: "#e0e0e0",
    });

  const ChartItem = ({ percentage, solved, total, label, color }) => {
    const [hover, setHover] = useState(false);

    return (
      <div
        className="relative w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center group"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <motion.div whileHover={{ scale: 1.1 }} className="relative">
          <CircularProgressbar
            value={percentage}
            text={""}
            styles={chartStyles(color)}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center text-sm sm:text-lg font-semibold transition-opacity duration-300 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
            style={{ color }}>
            <span>{Math.round(percentage)}%</span>
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center text-sm sm:text-lg font-semibold transition-opacity duration-300 ${
              hover ? "opacity-0" : "opacity-100"
            }`}
            style={{ color }}>
            <span>{`${solved}/${total}`}</span>
          </div>
        </motion.div>
        <p className="mt-2 text-center text-sm sm:text-lg font-medium">
          {label}
        </p>
      </div>
    );
  };

  return (
    <div className="mx-auto p-4">
      <div className="text-center mb-4">
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-20 h-20 rounded-full mx-auto mb-2"
        />
        <h1 className="text-2xl font-semibold">{username}</h1>
        <p className="text-lg">Ranking: {ranking}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-around items-center space-y-6 sm:space-y-0 sm:space-x-4 gap-4">
        <ChartItem
          percentage={easyPercentage}
          solved={easySolved}
          total={totalEasy}
          label="Easy"
          color="#4caf50"
        />
        <ChartItem
          percentage={mediumPercentage}
          solved={mediumSolved}
          total={totalMedium}
          label="Medium"
          color="#ffc107"
        />
        <ChartItem
          percentage={hardPercentage}
          solved={hardSolved}
          total={totalHard}
          label="Hard"
          color="#f44336"
        />
      </div>
    </div>
  );
};

// Loading Indicator Component
const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="w-24 h-24 border-4 border-gray-300 border-t-transparent border-solid rounded-full animate-spin" />
      <p className="text-gray-600">Loading...</p>
    </div>
  );
};

export default CircularProgressChart;
