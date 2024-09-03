import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Shimmer } from "react-shimmer"; // Import the Shimmer component
import CircularProgressChart from "../components/Dashboard/LeetCodeDisplay";
import CodeforcesUserInfo from "../components/Dashboard/CodeforcesDisplay";
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
        setError("Invalid session. Please log in again.", error);
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(`http://localhost:8001/user/${id}`, {
          withCredentials: true,
        });
        setUser(response.data);

        const attendanceResponse = await axios.get(
          `http://localhost:8001/attendance/${id}`,
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
    return <div>Loading....</div>;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Welcome, {user.name}!
      </h1>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Attendance Overview
        </h2>
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
                <li
                  key={subject._id}
                  className="p-4 rounded-lg shadow-md flex justify-between items-center"
                  style={{
                    background: `linear-gradient(90deg, ${
                      isBelowThreshold
                        ? "rgba(255, 99, 99, 0.5)"
                        : "rgba(72, 187, 120, 0.5)"
                    } ${attendancePercentage}%, rgba(255, 255, 255, 0) ${attendancePercentage}%)`,
                  }}>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Classes Attended:{" "}
                      <span className="font-semibold text-gray-800">
                        {subject.classesAttended}
                      </span>{" "}
                      / {subject.totalClasses}
                    </p>
                  </div>
                  <div
                    className={`text-xl font-bold px-4 py-2 rounded-full ${
                      isBelowThreshold
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}>
                    {attendancePercentage}%
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <CodingProfiles user={user} />
    </div>
  );
};

export default Dashboard;
