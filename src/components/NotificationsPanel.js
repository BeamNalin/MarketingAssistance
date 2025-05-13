import React from "react";
import { Bell, CheckCircle, TrendingUp, TrendingDown, X } from "lucide-react";

const NotificationsPanel = ({
  showNotifications,
  setShowNotifications,
  notifications,
}) => {
  if (!showNotifications) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  // สร้างฟังก์ชั่นเพื่อกำหนดไอคอนตามประเภทการแจ้งเตือน
  const getNotificationIcon = (notification) => {
    if (notification.title.includes("ลดราคา")) {
      return <TrendingDown size={16} style={{ color: "#ef4444" }} />;
    } else if (notification.title.includes("เพิ่มราคา")) {
      return <TrendingUp size={16} style={{ color: "#10b981" }} />;
    } else {
      return <CheckCircle size={16} style={{ color: "#3b82f6" }} />;
    }
  };

  // สร้างฟังก์ชั่นเพื่อกำหนดสีพื้นหลังตามประเภทการแจ้งเตือน
  const getNotificationBackground = (notification) => {
    if (notification.title.includes("ลดราคา")) {
      return notification.read ? "#fef2f2" : "#fee2e2";
    } else if (notification.title.includes("เพิ่มราคา")) {
      return notification.read ? "#f0fdf4" : "#dcfce7";
    } else {
      return notification.read ? "#f0f9ff" : "#dbeafe";
    }
  };

  // สร้างฟังก์ชั่นเพื่อกำหนดสีขอบตามประเภทการแจ้งเตือน
  const getNotificationBorder = (notification) => {
    if (notification.title.includes("ลดราคา")) {
      return notification.read ? "#fecaca" : "#fca5a5";
    } else if (notification.title.includes("เพิ่มราคา")) {
      return notification.read ? "#bbf7d0" : "#86efac";
    } else {
      return notification.read ? "#bfdbfe" : "#93c5fd";
    }
  };

  // สร้างฟังก์ชั่นเพื่อกำหนดสีหัวข้อตามประเภทการแจ้งเตือน
  const getNotificationTitleColor = (notification) => {
    if (notification.title.includes("ลดราคา")) {
      return "#b91c1c";
    } else if (notification.title.includes("เพิ่มราคา")) {
      return "#15803d";
    } else {
      return "#1e40af";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100%",
        width: "380px",
        backgroundColor: "white",
        boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.1)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Bell size={20} style={{ color: "#0f172a" }} />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#0f172a",
            }}
          >
            การแจ้งเตือน
            {unreadCount > 0 && (
              <span
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontSize: "12px",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  fontWeight: "500",
                }}
              >
                {unreadCount}
              </span>
            )}
          </h3>
        </div>
        <button
          onClick={() => setShowNotifications(false)}
          style={{
            background: "none",
            border: "none",
            padding: "6px",
            borderRadius: "6px",
            cursor: "pointer",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Notifications List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          backgroundColor: "#f1f5f9",
        }}
      >
        {notifications.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 0",
              color: "#64748b",
              height: "100%",
            }}
          >
            <Bell
              size={48}
              style={{ color: "#cbd5e1", marginBottom: "16px" }}
            />
            <p>ไม่มีการแจ้งเตือนใหม่</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: getNotificationBackground(notification),
                  border: `1px solid ${getNotificationBorder(notification)}`,
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0, 0, 0, 0.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 2px rgba(0, 0, 0, 0.05)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {getNotificationIcon(notification)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <h4
                        style={{
                          fontWeight: "600",
                          fontSize: "15px",
                          color: getNotificationTitleColor(notification),
                        }}
                      >
                        {notification.title}
                      </h4>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock size={12} />
                        {notification.time}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#334155",
                        lineHeight: "1.4",
                      }}
                    >
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "transparent",
            color: "#3b82f6",
            fontSize: "14px",
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
