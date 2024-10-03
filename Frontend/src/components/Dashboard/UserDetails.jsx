import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import UpdateDetails from "../../modals/UpdateDetails"; // Adjust path as needed

const UserDetailsForm = ({ user }) => {
  // Default values in case user is not provided
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

  // Use defaultUser if user is not provided
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
          `https://portfolify-4bjg.onrender.com/avatar/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setPreview(response.data.avatar);
        setFile(null); // Clear the file after upload
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
        `https://portfolify-4bjg.onrender.com/user/${id}`,
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

  if (!user) {
    return <div>Loading...</div>; // Show a loading state or a message if user is not provided
  }

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <div className="relative mb-4">
        <img
          src={preview}
          alt="User Avatar"
          className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
        />
        {file && (
          <button
            onClick={handleCancel}
            className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white cursor-pointer border border-white">
            <AiOutlineClose size={20} />
          </button>
        )}
        <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
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
          className="w-full p-2 border rounded"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Resume URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={currentGrade}
          onChange={(e) => setCurrentGrade(e.target.value)}
          placeholder="Current Grade"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={codingProfiles.leetCode}
          onChange={(e) =>
            setCodingProfiles({ ...codingProfiles, leetCode: e.target.value })
          }
          placeholder="LeetCode Profile"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={codingProfiles.codeforces}
          onChange={(e) =>
            setCodingProfiles({ ...codingProfiles, codeforces: e.target.value })
          }
          placeholder="Codeforces Profile"
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className={`flex items-center mt-4 px-4 py-2 ${
          saving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        } text-white rounded-lg shadow transition duration-300`}>
        <span>{saving ? "Saving..." : "Save Changes"}</span>
      </button>
      <UpdateDetails
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default UserDetailsForm;
