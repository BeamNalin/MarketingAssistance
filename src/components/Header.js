import React from "react";
import { ChevronLeft, Bell } from "lucide-react";

const Header = ({
  view,
  activeTab,
  selectedItem,
  handleBackToMain,
  showAppNotifications,
  setShowAppNotifications,
  notificationsData,
}) => {
  return (
    <header
      style={{
        backgroundColor: "white",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {view !== "main" && activeTab === "dashboard" && (
            <button
              onClick={handleBackToMain}
              style={{
                marginRight: "0.5rem",
                display: "flex",
                alignItems: "center",
                color: "#2563eb",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
            >
              <ChevronLeft size={18} style={{ marginRight: "0.25rem" }} />
              <span
                style={{
                  display: "none",
                  "@media (min-width: 768px)": { display: "inline" },
                }}
              >
                กลับ
              </span>
            </button>
          )}
          {view === "detail" && selectedItem && (
            <h1 style={{ fontSize: "1.125rem", fontWeight: "500" }}>
              {selectedItem.PRODUCT_Thai_DESC}
            </h1>
          )}
          {view === "ai-settings" && (
            <h1 style={{ fontSize: "1.125rem", fontWeight: "500" }}>
              ตั้งค่าระบบ AI
            </h1>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ position: "relative" }}>
            <button
              style={{
                padding: "0.5rem",
                color: "#6b7280",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => setShowAppNotifications(!showAppNotifications)}
            >
              <Bell size={20} />
              {notificationsData.filter((n) => !n.read).length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "0.25rem",
                    right: "0.25rem",
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontSize: "0.75rem",
                    width: "1rem",
                    height: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                  }}
                >
                  {notificationsData.filter((n) => !n.read).length}
                </span>
              )}
            </button>
          </div>
          <div>
            <div
              style={{
                backgroundColor: "#f3f4f6",
                padding: "0.25rem",
                borderRadius: "9999px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#3b82f6",
                  height: "2rem",
                  width: "2rem",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "white",
                  }}
                >
                  TS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
