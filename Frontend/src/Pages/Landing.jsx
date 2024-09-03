import React from "react";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBlog,
  FaBookmark,
  FaClipboardList,
} from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      {/* Background Parallax Layer */}
      <Parallax
        blur={0}
        bgImage="https://i.pinimg.com/originals/d0/e0/4a/d0e04a4cc8047cf05810e188494b58e1.jpg"
        bgImageAlt="background"
        strength={500}
        className="absolute inset-0">
        <div className="flex items-center justify-center h-screen">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center bg-opacity-70 bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Welcome to Your Ultimate Student Manager
            </h1>
            <p className="text-lg mb-8">
              Track attendance, publish blogs, manage coding profiles, and more.
              Everything you need to stay organized and productive.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                  Signup
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Parallax>

      {/* Foreground Parallax Layers */}
      <Parallax
        blur={10}
        bgImageAlt="foreground"
        strength={200}
        className="absolute inset-0"
        style={{ top: "20%" }}>
        <div className="relative z-10">
          <section className="py-20 px-6 text-center">
            <h2 className="text-4xl font-bold mb-12">Features</h2>
            <div className="flex flex-wrap justify-center gap-12">
              {[
                {
                  icon: <FaTachometerAlt className="text-4xl" />,
                  title: "Dashboard",
                  description:
                    "Track your progress and stay on top of your tasks.",
                },
                {
                  icon: <FaClipboardList className="text-4xl" />,
                  title: "Attendance Manager",
                  description:
                    "Manage your class schedules and attendance records efficiently.",
                },
                {
                  icon: <FaBlog className="text-4xl" />,
                  title: "Blog Publishing",
                  description:
                    "Publish and explore insightful blogs to stay informed and inspired.",
                },
                {
                  icon: <FaBookmark className="text-4xl" />,
                  title: "Coding Profiles",
                  description:
                    "Showcase and track your coding projects and skills.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="w-64 p-6 bg-gray-800 rounded-lg shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </Parallax>
    </div>
  );
};

export default LandingPage;
