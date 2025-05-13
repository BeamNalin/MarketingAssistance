// components/ToastNotification.js
import React, { useEffect } from "react";
import { CheckCircle, X, TrendingUp, TrendingDown, Bell } from "lucide-react";

const ToastNotification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // เลือกไอคอนตามประเภทการแจ้งเตือน
  const getIcon = () => {
    if (notification.title?.includes("ลดราคา")) {
      return <TrendingDown size={20} style={{ color: "#ef4444" }} />;
    } else if (notification.title?.includes("เพิ่มราคา")) {
      return <TrendingUp size={20} style={{ color: "#10b981" }} />;
    } else if (notification.type === "success") {
      return <CheckCircle size={20} style={{ color: "#10b981" }} />;
    } else {
      return <Bell size={20} style={{ color: "#3b82f6" }} />;
    }
  };

  // เลือกสีพื้นหลังตามประเภทการแจ้งเตือน
  const getBackground = () => {
    if (notification.title?.includes("ลดราคา")) {
      return "#fee2e2";
    } else if (notification.title?.includes("เพิ่มราคา")) {
      return "#dcfce7";
    } else if (notification.type === "success") {
      return "#dcfce7";
    } else {
      return "#dbeafe";
    }
  };

  // เลือกสีขอบตามประเภทการแจ้งเตือน
  const getBorder = () => {
    if (notification.title?.includes("ลดราคา")) {
      return "#fca5a5";
    } else if (notification.title?.includes("เพิ่มราคา")) {
      return "#86efac";
    } else if (notification.type === "success") {
      return "#86efac";
    } else {
      return "#93c5fd";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        maxWidth: "400px",
        backgroundColor: getBackground(),
        border: `1px solid ${getBorder()}`,
        borderRadius: "8px",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        padding: "12px 16px",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        animation: "slideIn 0.3s ease-out forwards",
      }}
    >
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      {getIcon()}
      <div style={{ flex: 1 }}>
        {notification.title && (
          <h4
            style={{ fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}
          >
            {notification.title}
          </h4>
        )}
        <p style={{ fontSize: "14px", margin: 0 }}>{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          padding: "4px",
          cursor: "pointer",
          color: "#64748b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ToastNotification;
