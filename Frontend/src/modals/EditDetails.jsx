import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const EditDetailsModal = ({ isOpen, onClose, user, onAvatarUpdate }) => {
  const defaultUser = {
    avatar: "",
    name: "",
    bio: "",
    resume: "",
    currentGrade: "",
    codingProfiles: {
      leetCode: "",
      codeforces: "",
      geeksForGeeks: "",
    },
  };

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(
    user ? user.avatar : defaultUser.avatar
  );
  const [name, setName] = useState(user ? user.name : defaultUser.name);
  const [bio, setBio] = useState(user ? user.bio : defaultUser.bio);
  const [resume, setResume] = useState(user ? user.resume : defaultUser.resume);
  const [currentGrade, setCurrentGrade] = useState(
    user ? user.currentGrade : defaultUser.currentGrade
  );
  const [codingProfiles, setCodingProfiles] = useState(
    user ? user.codingProfiles : defaultUser.codingProfiles
  );
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const id = user ? user._id : "";

  useEffect(() => {
    if (user) {
      setPreview(user.avatar);
      setName(user.name);
      setBio(user.bio);
      setResume(user.resume);
      setCurrentGrade(user.currentGrade);
      setCodingProfiles(user.codingProfiles);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreview(fileReader.result);
    };
    if (selectedFile) {
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleAvatarUpload = async () => {
    if (file && id) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await axios.post(
          `https://portfolify.onrender.com/avatar/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const newAvatar = response.data.avatar;
        setPreview(newAvatar);
        setFile(null); // Clear the file after upload

        // Call the onAvatarUpdate callback
        if (onAvatarUpdate) {
          onAvatarUpdate(newAvatar);
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);

    await handleAvatarUpload();

    try {
      const response = await axios.patch(
        `https://portfolify.onrender.com/user/${id}`,
        {
          name,
          bio,
          resume,
          currentGrade,
          codingProfiles,
        }
      );

      setModalMessage("User details updated successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("Error updating user details:", error);
      setModalMessage("Error updating user details.");
      setShowModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFile(null);
      setPreview(user.avatar);
      setName(user.name);
      setBio(user.bio);
      setResume(user.resume);
      setCurrentGrade(user.currentGrade);
      setCodingProfiles(user.codingProfiles);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md z-50" // Updated class names for the blur effect
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <AiOutlineClose size={24} className="text-red-600" />
            </button>
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={preview}
                  alt="User Avatar"
                  className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-md"
                />
                {file && (
                  <button
                    onClick={handleCancel}
                    className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white shadow-lg hover:bg-red-700 transition-colors duration-200">
                    <AiOutlineClose size={20} />
                  </button>
                )}
                <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200">
                  <label htmlFor="file-input" className="text-white">
                    <AiOutlineEdit size={24} />
                    <input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
              <div className="w-full space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Bio"
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
                <input
                  type="text"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Resume URL"
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
                <input
                  type="text"
                  value={currentGrade}
                  onChange={(e) => setCurrentGrade(e.target.value)}
                  placeholder="Current Grade"
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
                <input
                  type="text"
                  value={codingProfiles.leetCode}
                  onChange={(e) =>
                    setCodingProfiles({
                      ...codingProfiles,
                      leetCode: e.target.value,
                    })
                  }
                  placeholder="LeetCode Profile"
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
                <input
                  type="text"
                  value={codingProfiles.codeforces}
                  onChange={(e) =>
                    setCodingProfiles({
                      ...codingProfiles,
                      codeforces: e.target.value,
                    })
                  }
                  placeholder="Codeforces Profile"
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
                <input
                  type="text"
                  value={codingProfiles.geeksForGeeks}
                  onChange={(e) =>
                    setCodingProfiles({
                      ...codingProfiles,
                      geeksForGeeks: e.target.value,
                    })
                  }
                  placeholder="GeeksForGeeks Profile"
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center mt-4 px-4 py-2 ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                } rounded-lg shadow-md transition-colors duration-200`}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditDetailsModal;
