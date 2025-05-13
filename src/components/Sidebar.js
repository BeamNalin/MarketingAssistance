import React from "react";
import {
  Home,
  BarChart2,
  RefreshCw,
  Activity,
  Sparkles,
  Globe,
  Settings,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, setView }) => {
  return (
    <div
      className="sidebar"
      style={{ width: "16rem", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #3b82f6",
        }}
      >
        <Sparkles
          size={24}
          style={{ color: "#93c5fd", marginRight: "0.5rem" }}
        />
        <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          AI Marketing Assistance
        </span>
      </div>

      <nav style={{ flex: "1", padding: "0.5rem" }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <li>
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setView("main");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                background:
                  activeTab === "dashboard" ? "#3b82f6" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <Home size={20} style={{ flexShrink: 0 }} />
              <span style={{ marginLeft: "0.75rem" }}>หน้าหลัก</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveTab("market");
                setView("visualization");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                background: activeTab === "market" ? "#3b82f6" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <BarChart2 size={20} style={{ flexShrink: 0 }} />
              <span style={{ marginLeft: "0.75rem" }}>วิเคราะห์ตลาด</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveTab("autosync");
                setView("autosync");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                background:
                  activeTab === "autosync" ? "#3b82f6" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={20} style={{ flexShrink: 0 }} />
              <span style={{ marginLeft: "0.75rem" }}>ซิงค์ราคาอัตโนมัติ</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveTab("insights");
                setView("insights");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                background:
                  activeTab === "insights" ? "#3b82f6" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <Activity size={20} style={{ flexShrink: 0 }} />
              <span style={{ marginLeft: "0.75rem" }}>ข้อมูลเชิงลึก</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveTab("ai-settings");
                setView("ai-settings");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                background:
                  activeTab === "ai-settings" ? "#3b82f6" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <Sparkles size={20} style={{ flexShrink: 0 }} />
              <span style={{ marginLeft: "0.75rem" }}>ตั้งค่า AI</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveTab("map");
                setView("map");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                background: activeTab === "map" ? "#3b82f6" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <Globe size={20} style={{ flexShrink: 0 }} />
              <span style={{ marginLeft: "0.75rem" }}>แผนที่ราคา</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveTab("settings");
                setView("settings");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                background:
                  activeTab === "settings" ? "#3b82f6" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <Settings size={20} style={{ flexShrink: 0 }} />
              <span style={{ marginLeft: "0.75rem" }}>ตั้งค่า</span>
            </button>
          </li>
        </ul>
      </nav>

      <div style={{ padding: "1rem", borderTop: "1px solid #3b82f6" }}>
        <div
          style={{
            fontSize: "0.875rem",
            color: "#93c5fd",
            marginBottom: "0.5rem",
          }}
        >
          AI Marketing Assistance
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: "#3b82f6",
              height: "2rem",
              width: "2rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>TS</span>
          </div>
          <div style={{ marginLeft: "0.75rem" }}>
            <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>
              คุณธงชัย
            </div>
            <div style={{ fontSize: "0.75rem", color: "#93c5fd" }}>
              ผู้ดูแลระบบ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
