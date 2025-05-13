import React, { useState } from "react";
import {
  DollarSign,
  Target,
  Shuffle,
  Sparkles,
  Activity,
  Zap,
} from "lucide-react";
import productData from "./productData.js"; // Import productData directly

const AISettingsPage = ({
  aiWeights,
  handleWeightChange,
  handleRecalculateWithWeights,
}) => {
  const [selectedTarget, setSelectedTarget] = useState({
    type: "all",
    value: null,
  });
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
  });

  // Calculate unique categories from productData
  const categories =
    productData && Array.isArray(productData)
      ? [...new Set(productData.map((item) => item.category))].sort()
      : [];

  // Handle recalculate button click
  const onRecalculate = () => {
    handleRecalculateWithWeights(selectedTarget);
    setNotification({
      message:
        "ระบบกำลังทำงานเพื่อปรับราคาใหม่ตามที่กำหนดและจะอัพเดทใน 30 นาที",
      visible: true,
    });
    setTimeout(() => {
      setNotification({ message: "", visible: false });
    }, 5000);
  };

  const calculateTotalWeight = () => {
    return Object.values(aiWeights).reduce((sum, weight) => sum + weight, 0);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Notification */}
      {notification.visible && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #bfdbfe",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            color: "#1e40af",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
        >
          <Zap size={16} style={{ marginRight: "0.5rem", color: "#2563eb" }} />
          {notification.message}
        </div>
      )}

      {/* Header Section */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1e40af",
            marginBottom: "12px",
          }}
        >
          ตั้งค่าระบบ AI สำหรับการแนะนำราคา
        </h1>
        <p
          style={{
            color: "#4b5563",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          ปรับค่าถ่วงน้ำหนักของปัจจัยต่างๆ ที่ใช้ในการคำนวณราคาแนะนำ
          เพื่อให้เหมาะสมกับกลยุทธ์ของคุณ
        </p>
      </div>

      {/* Item/Category Selection */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "12px",
          }}
        >
          เลือกเป้าหมายสำหรับการตั้งค่า AI
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#4b5563",
            marginBottom: "16px",
          }}
        >
          เลือกหมวดหมู่หรือสินค้าเฉพาะเพื่อปรับการตั้งค่า AI
        </p>
        <select
          value={selectedTarget.value || "all"}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "all") {
              setSelectedTarget({ type: "all", value: null });
            } else if (value.startsWith("category_")) {
              setSelectedTarget({
                type: "category",
                value: value.replace("category_", ""),
              });
            } else {
              setSelectedTarget({ type: "item", value });
            }
          }}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            backgroundColor: "white",
            fontSize: "14px",
            color: "#374151",
            cursor: "pointer",
          }}
        >
          <option value="all">เลือกทั้งหมด</option>
          {categories.length > 0 && (
            <optgroup label="หมวดหมู่">
              {categories.map((category) => (
                <option
                  key={`category_${category}`}
                  value={`category_${category}`}
                >
                  หมวดหมู่: {category}
                </option>
              ))}
            </optgroup>
          )}
          {productData && productData.length > 0 && (
            <optgroup label="สินค้า">
              {productData.map((item) => (
                <option key={item.Item} value={item.PRODUCT_Thai_DESC}>
                  {item.PRODUCT_Thai_DESC}
                </option>
              ))}
            </optgroup>
          )}
        </select>
        {(!productData || productData.length === 0) && (
          <p
            style={{
              fontSize: "12px",
              color: "#dc2626",
              marginTop: "8px",
            }}
          >
            ไม่มีสินค้าหรือหมวดหมู่ให้เลือก กรุณาตรวจสอบข้อมูล
          </p>
        )}
      </div>

      {/* Weight Settings Section */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "12px",
          }}
        >
          ค่าถ่วงน้ำหนักของ Reward
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#4b5563",
            marginBottom: "24px",
          }}
        >
          ปรับค่าน้ำหนักของแต่ละปัจจัยเพื่อให้มีอิทธิพลต่อการคำนวณราคาแนะนำ
          (รวมกันต้องเท่ากับ 100%)
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Price Sensitivity */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#dbeafe",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                <DollarSign size={20} style={{ color: "#2563eb" }} />
              </div>
              <label
                style={{
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                ความอ่อนไหวต่อราคา (Price Sensitivity)
              </label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "8px",
              }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={aiWeights.priceSensitivity}
                onChange={(e) =>
                  handleWeightChange("priceSensitivity", e.target.value)
                }
                style={{
                  flexGrow: 1,
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: "#e5e7eb",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                  accentColor: "#2563eb",
                }}
              />
              <div style={{ width: "64px" }}>
                <input
                  type="number"
                  value={aiWeights.priceSensitivity}
                  onChange={(e) =>
                    handleWeightChange("priceSensitivity", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "4px",
              }}
            >
              ค่าสูง = มีแนวโน้มที่จะปรับราคาให้ใกล้เคียงกับราคาตลาด
            </p>
          </div>

          {/* ROG Strategy */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f3e8ff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                <Target size={20} style={{ color: "#8b5cf6" }} />
              </div>
              <label
                style={{
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                กลยุทธ์ ROG (ROG Strategy)
              </label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "8px",
              }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={aiWeights.rogStrategy}
                onChange={(e) =>
                  handleWeightChange("rogStrategy", e.target.value)
                }
                style={{
                  flexGrow: 1,
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: "#e5e7eb",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                  accentColor: "#8b5cf6",
                }}
              />
              <div style={{ width: "64px" }}>
                <input
                  type="number"
                  value={aiWeights.rogStrategy}
                  onChange={(e) =>
                    handleWeightChange("rogStrategy", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "4px",
              }}
            >
              ค่าสูง = ราคาจะเป็นไปตามกลยุทธ์ที่กำหนด (Value, Premium, ...)
            </p>
          </div>

          {/* Profit Margin */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#dcfce7",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                <DollarSign size={20} style={{ color: "#16a34a" }} />
              </div>
              <label
                style={{
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                อัตรากำไร (Profit Margin)
              </label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "8px",
              }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={aiWeights.profitMargin}
                onChange={(e) =>
                  handleWeightChange("profitMargin", e.target.value)
                }
                style={{
                  flexGrow: 1,
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: "#e5e7eb",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                  accentColor: "#16a34a",
                }}
              />
              <div style={{ width: "64px" }}>
                <input
                  type="number"
                  value={aiWeights.profitMargin}
                  onChange={(e) =>
                    handleWeightChange("profitMargin", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "4px",
              }}
            >
              ค่าสูง = พยายามรักษาอัตรากำไรให้สูง
            </p>
          </div>

          {/* Competitor Sensitivity */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                <Shuffle size={20} style={{ color: "#dc2626" }} />
              </div>
              <label
                style={{
                  color: "#374151",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                ความอ่อนไหวต่อคู่แข่ง (Competitor Sensitivity)
              </label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "8px",
              }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={aiWeights.competitorSensitivity}
                onChange={(e) =>
                  handleWeightChange("competitorSensitivity", e.target.value)
                }
                style={{
                  flexGrow: 1,
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: "#e5e7eb",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                  accentColor: "#dc2626",
                }}
              />
              <div style={{ width: "64px" }}>
                <input
                  type="number"
                  value={aiWeights.competitorSensitivity}
                  onChange={(e) =>
                    handleWeightChange("competitorSensitivity", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "4px",
              }}
            >
              ค่าสูง = ตอบสนองต่อการเปลี่ยนแปลงราคาคู่แข่งอย่างรวดเร็ว
            </p>
          </div>
        </div>

        {/* Total Weight and Recalculate Button */}
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: "14px", color: "#374151" }}>
            น้ำหนักรวม:{" "}
            <span
              style={{
                fontWeight: "bold",
                color: calculateTotalWeight() !== 100 ? "#dc2626" : "#16a34a",
              }}
            >
              {calculateTotalWeight()}%
            </span>
            {calculateTotalWeight() !== 100 && (
              <span
                style={{
                  color: "#dc2626",
                  marginLeft: "8px",
                  fontSize: "12px",
                }}
              >
                (ควรเท่ากับ 100%)
              </span>
            )}
          </div>
          <button
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor:
                calculateTotalWeight() !== 100 ? "#d1d5db" : "#2563eb",
              color: calculateTotalWeight() !== 100 ? "#6b7280" : "white",
              cursor:
                calculateTotalWeight() !== 100 ? "not-allowed" : "pointer",
              border: "none",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
            onClick={onRecalculate}
            disabled={calculateTotalWeight() !== 100}
          >
            <Sparkles size={16} />
            คำนวณราคาใหม่ตามค่าถ่วงน้ำหนัก
          </button>
        </div>
      </div>

      {/* AI Models Section */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "16px",
          }}
        >
          โมเดล AI ที่ใช้งาน
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* XGBoost Model */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "16px",
              backgroundColor: "#ebf5ff",
              borderRadius: "8px",
              border: "1px solid #bfdbfe",
              transition: "box-shadow 0.2s",
            }}
          >
            <div
              style={{
                backgroundColor: "#dbeafe",
                padding: "8px",
                borderRadius: "50%",
                marginRight: "16px",
              }}
            >
              <Sparkles size={20} style={{ color: "#2563eb" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: "500", color: "#1e40af" }}>
                XGBoost Model
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  marginTop: "4px",
                  lineHeight: "1.4",
                }}
              >
                โมเดล Gradient Boosting
                ที่วิเคราะห์ราคาจากข้อมูลในอดีตและปัจจัยต่างๆ (ความแม่นยำ 89%)
              </p>
            </div>
          </div>

          {/* LSTM Model */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "16px",
              backgroundColor: "#f5f3ff",
              borderRadius: "8px",
              border: "1px solid #e9d5ff",
              transition: "box-shadow 0.2s",
            }}
          >
            <div
              style={{
                backgroundColor: "#ede9fe",
                padding: "8px",
                borderRadius: "50%",
                marginRight: "16px",
              }}
            >
              <Activity size={20} style={{ color: "#8b5cf6" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: "500", color: "#6d28d9" }}>
                LSTM Model
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  marginTop: "4px",
                  lineHeight: "1.4",
                }}
              >
                โมเดล Long Short-Term Memory
                ที่คาดการณ์แนวโน้มราคาจากข้อมูลอนุกรมเวลา (ความแม่นยำ 85%)
              </p>
            </div>
          </div>

          {/* DQN Model */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "16px",
              backgroundColor: "#f0fdf4",
              borderRadius: "8px",
              border: "1px solid #bbf7d0",
              transition: "box-shadow 0.2s",
            }}
          >
            <div
              style={{
                backgroundColor: "#dcfce7",
                padding: "8px",
                borderRadius: "50%",
                marginRight: "16px",
              }}
            >
              <Sparkles size={20} style={{ color: "#16a34a" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: "500", color: "#166534" }}>DQN Model</h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  marginTop: "4px",
                  lineHeight: "1.4",
                }}
              >
                โมเดล Deep Q-Network ที่ปรับราคาให้เหมาะสมตามเป้าหมายที่กำหนด
                (ความแม่นยำ 87%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettingsPage;
