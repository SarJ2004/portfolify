import React, { useState } from "react";
import CircularProgressChart from "../Dashboard/LeetCodeDisplay";
import CodeforcesUserInfo from "../Dashboard/CodeforcesDisplay";
import GeeksForGeeksDisplay from "./GeeksForGeeksDisplay"; // Assuming you have this component for GeeksForGeeks

function CodingProfiles({ user }) {
  const [activeTab, setActiveTab] = useState("LeetCode");

  const renderTabContent = () => {
    if (!user || !user.codingProfiles) {
      return <div>Loading coding profiles...</div>;
    }

    switch (activeTab) {
      case "LeetCode":
        return user.codingProfiles.leetCode ? (
          <CircularProgressChart username={user.codingProfiles.leetCode} />
        ) : (
          <div>No LeetCode profile available.</div>
        );
      case "Codeforces":
        return user.codingProfiles.codeforces ? (
          <CodeforcesUserInfo username={user.codingProfiles.codeforces} />
        ) : (
          <div>No Codeforces profile available.</div>
        );
      case "GeeksForGeeks":
        return user.codingProfiles.geeksForGeeks ? (
          <GeeksForGeeksDisplay username={user.codingProfiles.geeksForGeeks} />
        ) : (
          <div>No GeeksForGeeks profile available.</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md min-h-[630px]">
      <h2 className="text-xl font-semibold mb-4">Coding Profiles</h2>
      <div className="mb-4 flex flex-wrap justify-center sm:justify-start">
        <button
          className={`flex-1 sm:flex-none p-2 ${
            activeTab === "LeetCode"
              ? "border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("LeetCode")}>
          LeetCode
        </button>
        <button
          className={`flex-1 sm:flex-none p-2 ${
            activeTab === "Codeforces"
              ? "border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Codeforces")}>
          Codeforces
        </button>
        <button
          className={`flex-1 sm:flex-none p-2 ${
            activeTab === "GeeksForGeeks"
              ? "border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("GeeksForGeeks")}>
          GeeksForGeeks
        </button>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
}

export default CodingProfiles;
