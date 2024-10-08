import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Shimmer } from "react-shimmer";
import { motion } from "framer-motion";
import CodingProfiles from "../components/Dashboard/CodingProfiles";

const getAuthToken = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "token") {
      return value;
    }
  }
  return null;
};

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    let loggedInUserId;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        loggedInUserId = decodedToken._id;

        if (loggedInUserId !== id) {
          setError("Unauthorized access");
          navigate("/login");
          return;
        }
      } catch (error) {
        setError("Invalid session. Please log in again.");
        navigate("/login");
        return;
      }
    } else {
      setError("You are not logged in");
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://portfolify-4bjg.onrender.com/user/${id}`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data);

        const attendanceResponse = await axios.get(
          `https://portfolify-4bjg.onrender.com/attendance/${id}`,
          {
            withCredentials: true,
          }
        );
        setAttendance(attendanceResponse.data.subjects || []);
      } catch (error) {
        setError("Failed to fetch user info");
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [id, navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return (
      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
        <motion.h1
          className="text-2xl font-bold mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          <Shimmer width={200} height={30} />
        </motion.h1>

        <motion.div
          className="mb-6 p-4 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}>
          <motion.h2
            className="text-xl font-semibold mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}>
            <Shimmer width={150} height={20} />
          </motion.h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg shadow-md flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.5 }}>
                <div className="flex flex-col">
                  <Shimmer width={100} height={20} />
                  <Shimmer width={150} height={15} className="mt-2" />
                </div>
                <Shimmer width={70} height={30} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-6 p-4 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}>
          <CodingProfiles user={user} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <motion.h1
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        Welcome, {user.name}!
      </motion.h1>

      <motion.div
        className="mb-6 p-4 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <motion.h2
          className="text-xl font-semibold mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          Attendance Overview
        </motion.h2>
        {attendance.length === 0 ? (
          <p className="text-center text-gray-500">
            No attendance data available.
          </p>
        ) : (
          <ul className="space-y-4">
            {attendance.map((subject) => {
              const attendancePercentage = (
                (subject.classesAttended / subject.totalClasses) *
                100
              ).toFixed(2);
              const isBelowThreshold = attendancePercentage < 75;

              return (
                <motion.li
                  key={subject._id}
                  className="p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center"
                  style={{
                    background: `linear-gradient(90deg, ${
                      isBelowThreshold
                        ? "rgba(255, 99, 99, 0.5)"
                        : "rgba(72, 187, 120, 0.5)"
                    } ${attendancePercentage}%, rgba(255, 255, 255, 0) ${attendancePercentage}%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}>
                  <div className="flex flex-col sm:w-2/3">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {subject.name}
                    </h3>
                    <p className="text-sm md:text-lg">
                      <span className="block sm:inline">
                        Classes Attended:{" "}
                        <span className="font-semibold text-gray-800">
                          {subject.classesAttended}
                        </span>{" "}
                        / {subject.totalClasses}
                      </span>
                    </p>
                  </div>
                  <div
                    className={`text-xl sm:text-lg md:text-xl font-bold px-2 py-1 md:px-4 md:py-2 rounded-full mt-2 sm:mt-0 ${
                      isBelowThreshold
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}>
                    {attendancePercentage}%
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </motion.div>

      <motion.div
        className="p-4 sm:p-6 bg-gray-100 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}>
        <CodingProfiles user={user} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
