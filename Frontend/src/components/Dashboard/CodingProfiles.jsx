import React, { useState } from "react";
import CircularProgressChart from "../Dashboard/LeetCodeDisplay";
import CodeforcesUserInfo from "../Dashboard/CodeforcesDisplay";
import GeeksForGeeksDisplay from "./GeeksForGeeksDisplay"; // Assuming you have this component for GeeksForGeeks

function CodingProfiles({ user }) {
  const [activeTab, setActiveTab] = useState("LeetCode");

  const renderTabContent = () => {
    switch (activeTab) {
      case "LeetCode":
        return (
          user.codingProfiles.leetCode && (
            <CircularProgressChart username={user.codingProfiles.leetCode} />
          )
        );
      case "Codeforces":
        return (
          user.codingProfiles.codeforces && (
            <CodeforcesUserInfo username={user.codingProfiles.codeforces} />
          )
        );
      case "GeeksForGeeks":
        return (
          user.codingProfiles.geeksForGeeks && (
            <GeeksForGeeksDisplay
              username={user.codingProfiles.geeksForGeeks}
            />
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md min-h-[600px]">
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
