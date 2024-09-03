import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Attendance = () => {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: "",
    classesAttended: "0",
    totalClasses: "0",
  });

  // Fetch subjects on mount
  useEffect(() => {
    axios
      .get(`http://localhost:8001/attendance/${id}`)
      .then((response) => setSubjects(response.data.subjects || []))
      .catch((error) => console.error("Error fetching subjects:", error));
  }, [id]);

  // Add new subject
  const handleAddSubject = () => {
    if (!newSubject.name.trim()) {
      return;
    }

    const updatedSubjects = [
      ...subjects,
      {
        ...newSubject,
        classesAttended: parseInt(newSubject.classesAttended, 10),
        totalClasses: parseInt(newSubject.totalClasses, 10),
      },
    ];

    axios
      .post(`http://localhost:8001/attendance/${id}`, {
        subjects: updatedSubjects,
      })
      .then((response) => {
        setSubjects(response.data.subjects);
        setNewSubject({ name: "", classesAttended: "0", totalClasses: "0" });
      })
      .catch((error) => console.error("Error adding subject:", error));
  };

  // Update attendance count for a subject
  const handleAttendanceChange = (subjectId, type, action) => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject._id === subjectId) {
        const updatedValue =
          action === "increment"
            ? parseInt(subject[type], 10) + 1
            : parseInt(subject[type], 10) - 1;
        return {
          ...subject,
          [type]: Math.max(updatedValue, 0), // Prevent negative values
        };
      }
      return subject;
    });

    axios
      .post(`http://localhost:8001/attendance/${id}`, {
        subjects: updatedSubjects,
      })
      .then((response) => setSubjects(response.data.subjects))
      .catch((error) => console.error("Error updating subject:", error));
  };

  // Delete subject
  const handleDeleteSubject = (subjectId) => {
    const updatedSubjects = subjects.filter(
      (subject) => subject._id !== subjectId
    );

    axios
      .post(`http://localhost:8001/attendance/${id}`, {
        subjects: updatedSubjects,
      })
      .then((response) => setSubjects(response.data.subjects))
      .catch((error) => console.error("Error deleting subject:", error));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Subjects and Attendance
      </h1>

      <motion.form
        onSubmit={(e) => e.preventDefault()}
        className="mb-6 p-6 bg-white rounded-lg shadow-md border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Add New Subject
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label htmlFor="subject-name" className="text-gray-600 mb-1">
              Subject Name
            </label>
            <input
              id="subject-name"
              type="text"
              placeholder="Enter subject name"
              value={newSubject.name}
              onChange={(e) =>
                setNewSubject({ ...newSubject, name: e.target.value })
              }
              className="border-b-2 p-2 focus:border-blue-500 transition-all outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="classes-attended" className="text-gray-600 mb-1">
              Classes Attended
            </label>
            <input
              id="classes-attended"
              type="number"
              placeholder="0"
              value={newSubject.classesAttended}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  classesAttended: e.target.value,
                })
              }
              className="border-b-2 p-2 focus:border-blue-500 transition-all outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="total-classes" className="text-gray-600 mb-1">
              Total Classes
            </label>
            <input
              id="total-classes"
              type="number"
              placeholder="0"
              value={newSubject.totalClasses}
              onChange={(e) =>
                setNewSubject({ ...newSubject, totalClasses: e.target.value })
              }
              className="border-b-2 p-2 focus:border-blue-500 transition-all outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleAddSubject}
          className={`mt-4 p-2 rounded shadow transition-all ${
            !newSubject.name.trim()
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={!newSubject.name.trim()}>
          Add Subject
        </button>
      </motion.form>

      <div className="grid gap-4">
        {subjects.map((subject) => (
          <motion.div
            key={subject._id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-semibold text-gray-800">
                  {subject.name}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">Classes Attended:</p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          handleAttendanceChange(
                            subject._id,
                            "classesAttended",
                            "decrement"
                          )
                        }
                        className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-500">
                        <FaMinus size={14} />
                      </button>
                      <span className="text-gray-800">
                        {subject.classesAttended}
                      </span>
                      <button
                        onClick={() =>
                          handleAttendanceChange(
                            subject._id,
                            "classesAttended",
                            "increment"
                          )
                        }
                        className="p-1 rounded bg-green-100 hover:bg-green-200 text-green-500">
                        <FaPlus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600">Total Classes:</p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          handleAttendanceChange(
                            subject._id,
                            "totalClasses",
                            "decrement"
                          )
                        }
                        className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-500">
                        <FaMinus size={14} />
                      </button>
                      <span className="text-gray-800">
                        {subject.totalClasses}
                      </span>
                      <button
                        onClick={() =>
                          handleAttendanceChange(
                            subject._id,
                            "totalClasses",
                            "increment"
                          )
                        }
                        className="p-1 rounded bg-green-100 hover:bg-green-200 text-green-500">
                        <FaPlus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center sm:justify-end">
                <button
                  onClick={() => handleDeleteSubject(subject._id)}
                  className="text-red-500 hover:text-red-700 transition-all">
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
