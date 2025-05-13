import React from "react";
import { CheckCircle } from "lucide-react";

const AutoSyncPage = ({ autoPrice, toggleAutoPrice, setNotification }) => {
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1e40af",
            marginBottom: "0.5rem",
          }}
        >
          ซิงค์ราคาอัตโนมัติ
        </h1>
        <p style={{ color: "#4b5563" }}>
          ตั้งค่าการอัพเดทราคาสินค้าอัตโนมัติตามเงื่อนไขที่กำหนด
        </p>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#1f2937",
            }}
          >
            สถานะการซิงค์ราคาอัตโนมัติ
          </h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                marginRight: "0.5rem",
                fontSize: "0.875rem",
                color: autoPrice ? "#16a34a" : "#6b7280",
              }}
            >
              {autoPrice ? "เปิดใช้งาน" : "ปิดใช้งาน"}
            </span>
            <button
              onClick={toggleAutoPrice}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                height: "1.5rem",
                width: "2.75rem",
                borderRadius: "9999px",
                backgroundColor: autoPrice ? "#16a34a" : "#d1d5db",
                cursor: "pointer",
                border: "none",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "1rem",
                  height: "1rem",
                  transform: autoPrice
                    ? "translateX(1.5rem)"
                    : "translateX(0.25rem)",
                  transition: "transform 200ms ease-in-out",
                  backgroundColor: "white",
                  borderRadius: "9999px",
                }}
              />
            </button>
          </div>
        </div>

        {/* Options for sync */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              ความถี่ในการซิงค์ราคา
            </label>
            <select
              style={{
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                width: "100%",
                outline: "none",
              }}
              defaultValue="daily"
            >
              <option value="hourly">ทุกชั่วโมง</option>
              <option value="daily">ทุกวัน</option>
              <option value="weekly">ทุกสัปดาห์</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              กลยุทธ์การปรับราคา
            </label>
            <select
              style={{
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                width: "100%",
                outline: "none",
              }}
              defaultValue="match"
            >
              <option value="match">เท่ากับราคาคู่แข่งที่ต่ำที่สุด</option>
              <option value="beat">ต่ำกว่าราคาคู่แข่งที่ต่ำที่สุด 5%</option>
              <option value="above">สูงกว่าราคาคู่แข่งที่ต่ำที่สุด 5%</option>
              <option value="ai">ใช้ราคาแนะนำจาก AI</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <button
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              width: "100%",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setNotification({
                type: "success",
                message: "บันทึกการตั้งค่าซิงค์ราคาเรียบร้อยแล้ว",
                duration: 3000,
              });

              setTimeout(() => {
                setNotification(null);
              }, 3000);
            }}
          >
            บันทึกการตั้งค่า
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          padding: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "1rem",
          }}
        >
          ประวัติการซิงค์ราคา
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.75rem",
              backgroundColor: "#f0fff4",
              border: "1px solid #d1fae5",
              borderRadius: "0.5rem",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                backgroundColor: "#dcfce7",
                padding: "0.5rem",
                borderRadius: "9999px",
                marginRight: "0.75rem",
              }}
            >
              <CheckCircle size={16} style={{ color: "#16a34a" }} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                ซิงค์ราคาสำเร็จ
              </h3>
              <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                20 มี.ค. 2025, 08:30 น.
              </p>
            </div>
            <div style={{ fontSize: "0.875rem", color: "#2563eb" }}>
              5 รายการ
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.75rem",
              backgroundColor: "#f0fff4",
              border: "1px solid #d1fae5",
              borderRadius: "0.5rem",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                backgroundColor: "#dcfce7",
                padding: "0.5rem",
                borderRadius: "9999px",
                marginRight: "0.75rem",
              }}
            >
              <CheckCircle size={16} style={{ color: "#16a34a" }} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                ซิงค์ราคาสำเร็จ
              </h3>
              <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                19 มี.ค. 2025, 08:30 น.
              </p>
            </div>
            <div style={{ fontSize: "0.875rem", color: "#2563eb" }}>
              8 รายการ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoSyncPage;
