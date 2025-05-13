import React, { useState } from "react";
import DashboardWithVisualization from "./components/DashboardWithVisualization";

const App = () => {
  // State for theme (optional)
  const [theme, setTheme] = useState("light");

  // Toggle theme (optional)
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Optional: Theme toggle button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Main Dashboard */}
      <DashboardWithVisualization />
    </div>
  );
};

export default App;
