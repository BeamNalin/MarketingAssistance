import React, { useState, useEffect } from "react";
import productData, {
  getItemsToAdjust,
  getNotificationsData,
} from "./productData";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpDown,
  Download,
  RefreshCw,
  BarChart2,
  Filter,
  Clock,
  Zap,
  ChevronDown,
  X,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// สีสำหรับกราฟวงกลม
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Popup = ({ item, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        maxWidth: "300px",
        zIndex: 1000,
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <h4
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#1e40af",
          }}
        >
          แนะนำปรับราคา
        </h4>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
          }}
        >
          <X size={16} style={{ color: "#6b7280" }} />
        </button>
      </div>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#374151",
          marginBottom: "0.5rem",
        }}
      >
        {item.PRODUCT_Thai_DESC}
      </p>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#374151",
        }}
      >
        ราคาแนะนำ: {item.Predicted_Price_DQN} บาท
      </p>
      <p
        style={{
          fontSize: "0.875rem",
          display: "flex",
          alignItems: "center",
          color:
            item.dqnDiff > 0
              ? "#166534"
              : item.dqnDiff < 0
              ? "#b91c1c"
              : "#1f2937",
        }}
      >
        ส่วนต่าง:
        <span
          style={{
            marginLeft: "0.25rem",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {item.dqnDiff > 0 ? (
            <>
              <TrendingUp size={12} style={{ marginRight: "0.25rem" }} />+
              {item.dqnDiff}
            </>
          ) : item.dqnDiff < 0 ? (
            <>
              <TrendingDown size={12} style={{ marginRight: "0.25rem" }} />
              {item.dqnDiff}
            </>
          ) : (
            "0"
          )}
        </span>
      </p>
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
    </div>
  );
};

const MainPage = ({
  handleUpdatePrices,
  handleGoToVisualization,
  handleGoToAISettings,
  handleItemClick,
}) => {
  // State
  const [itemsToAdjust, setItemsToAdjust] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [autoPrice, setAutoPrice] = useState(false);
  const [showAppNotifications, setShowAppNotifications] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const [showPopup, setShowPopup] = useState(false);
  const [popupItem, setPopupItem] = useState(null);
  const [recentItems, setRecentItems] = useState([]);

  // โหลดข้อมูลเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    setItemsToAdjust(getItemsToAdjust());
    // Mock notifications from Big C, Lotus, Gourmet
    setNotificationsData([
      {
        title: "Big C: ราคาน้ำดื่มคริสตัลเปลี่ยนแปลง",
        message: "Big C ลดราคาน้ำดื่มคริสตัล 600ml -0.5 บาท",
        time: "15 เม.ย. 2025, 10:30",
        read: false,
      },
      {
        title: "Lotus: อัพเดทราคาโค้ก",
        message: "Lotus เพิ่มราคาโค้ก 1.5L +1.0 บาท",
        time: "14 เม.ย. 2025, 14:15",
        read: true,
      },
      {
        title: "Gourmet: สินค้าหมดสต็อก",
        message: "Gourmet ยกเลิกจำหน่ายทิปโก้ 500ml",
        time: "13 เม.ย. 2025, 09:00",
        read: false,
      },
    ]);
  }, []);

  // จัดการ popup ทุก 20 วินาที
  useEffect(() => {
    if (productData.length === 0) return;

    const selectRandomItem = () => {
      // กรองไอเทมที่ไม่ใช่ไอเทมที่แสดงล่าสุด
      const availableItems = productData.filter(
        (item) => !recentItems.includes(item.Item)
      );
      // ถ้าไม่มีไอเทมที่ใช้ได้ ให้ใช้ทั้งหมด
      const itemsToUse =
        availableItems.length > 0 ? availableItems : productData;
      const randomIndex = Math.floor(Math.random() * itemsToUse.length);
      const selectedItem = itemsToUse[randomIndex];

      setPopupItem(selectedItem);
      setShowPopup(true);
      // อัพเดท recentItems (เก็บสูงสุด 5 รายการ)
      setRecentItems((prev) => {
        const newRecent = [selectedItem.Item, ...prev].slice(0, 5);
        return newRecent;
      });
    };

    // แสดง popup แรกทันที
    selectRandomItem();

    // ตั้ง interval ทุก 20 วินาที
    const interval = setInterval(() => {
      selectRandomItem();
    }, 20000);

    // Cleanup interval เมื่อ component unmount
    return () => clearInterval(interval);
  }, []); // ลบ recentItems ออกจาก dependency

  // ฟังก์ชันปิด popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // ฟังก์ชันสลับโหมดการตั้งราคาอัตโนมัติ
  const toggleAutoPrice = () => {
    setAutoPrice(!autoPrice);
  };

  // เพิ่มจำนวนไอเทมที่แสดง
  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + 4);
  };

  // กรองรายการสินค้าตามคำค้นหา
  const filteredItems = searchTerm
    ? productData.filter(
        (item) =>
          item.Item.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.PRODUCT_Thai_DESC.toLowerCase().includes(
            searchTerm.toLowerCase()
          )
      )
    : productData;

  // แสดงเฉพาะจำนวนไอเทมที่กำหนด
  const displayedItems = filteredItems.slice(0, visibleItems);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1e40af" }}
          >
            ระบบแนะนำราคาสินค้า
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem",
                background: "linear-gradient(to right, #dbeafe, #bfdbfe)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                borderRadius: "0.5rem",
              }}
            >
              <Sparkles
                size={22}
                style={{ color: "#2563eb", marginRight: "0.5rem" }}
              />
              <div>
                <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                  ควรปรับราคา
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.125rem",
                    color: "#1e40af",
                  }}
                >
                  20 รายการ
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to right, #ebf8ff, #e6f7ff)",
              padding: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                color: "#4b5563",
                marginBottom: "0.25rem",
              }}
            >
              จำนวนรายการสินค้าทั้งหมด
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1e40af",
              }}
            >
              300
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(to right, #f0fff4, #e6ffed)",
              padding: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                color: "#4b5563",
                marginBottom: "0.25rem",
              }}
            >
              ยอดขายรวม
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#047857",
              }}
            >
              600,950 บาท
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(to right, #f5f3ff, #ede9fe)",
              padding: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                color: "#4b5563",
                marginBottom: "0.25rem",
              }}
            >
              จำนวนหน่วยขายรวม
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#6d28d9",
              }}
            >
              30,550 หน่วย
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              padding: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                สัดส่วนสินค้าตามความสามารถในการแข่งขันราคา
              </h2>
              <button
                style={{
                  fontSize: "0.75rem",
                  color: "#2563eb",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
              >
                ดูรายละเอียด
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "200px",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "ถูกกว่าคู่แข่ง", value: 120 },
                      { name: "เท่ากับคู่แข่ง", value: 60 },
                      { name: "แพงกว่าคู่แข่ง", value: 120 },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {[0, 1, 2].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              padding: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                แจ้งเตือนราคาล่าสุด
              </h2>
              <button
                style={{
                  fontSize: "0.75rem",
                  color: "#2563eb",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
                onClick={() => setShowAppNotifications(true)}
              >
                ดูทั้งหมด
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {notificationsData.slice(0, 3).map((notification, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    background: notification.read ? "#f9fafb" : "#ebf5ff",
                    border: `1px solid ${
                      notification.read ? "#e5e7eb" : "#bfdbfe"
                    }`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: notification.read ? "#1f2937" : "#1e40af",
                      }}
                    >
                      {notification.title}
                    </h4>
                    <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                      {notification.time}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#4b5563",
                      marginTop: "0.25rem",
                    }}
                  >
                    {notification.message}
                  </p>
                </div>
              ))}
              {notificationsData.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    color: "#6b7280",
                  }}
                >
                  ไม่มีการแจ้งเตือนใหม่
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "0.75rem",
            }}
          >
            การจัดการราคาสินค้า
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <button
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
              }}
            >
              <Download size={16} style={{ marginRight: "0.5rem" }} />
              ดาวน์โหลดข้อมูล
            </button>
            <button
              style={{
                backgroundColor: "#10b981",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
              }}
              onClick={handleUpdatePrices}
            >
              <RefreshCw size={16} style={{ marginRight: "0.5rem" }} />
              อัพเดทราคาสินค้า
            </button>
            <button
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
              }}
              onClick={handleGoToVisualization}
            >
              <BarChart2 size={16} style={{ marginRight: "0.5rem" }} />
              วิเคราะห์ข้อมูลราคา
            </button>
            <button
              style={{
                backgroundColor: "#8b5cf6",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
              }}
              onClick={handleGoToAISettings}
            >
              <Sparkles size={16} style={{ marginRight: "0.5rem" }} />
              ตั้งค่า AI
            </button>
            <button
              style={{
                backgroundColor: autoPrice ? "#ef4444" : "#8b5cf6",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onClick={toggleAutoPrice}
            >
              <Zap size={16} style={{ marginRight: "0.5rem" }} />
              {autoPrice
                ? "ปิดการตั้งราคาอัตโนมัติ"
                : "เปิดการตั้งราคาอัตโนมัติ"}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ position: "relative", flexGrow: 1 }}>
            <input
              type="text"
              placeholder="ค้นหาสินค้าด้วยบาร์โค้ดหรือชื่อสินค้า..."
              style={{
                width: "100%",
                padding: "0.5rem",
                paddingLeft: "2.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                outline: "none",
                transition: "all 0.2s",
              }}
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "0.625rem",
                color: "#9ca3af",
              }}
            />
          </div>
          <button
            style={{
              backgroundColor: "#f3f4f6",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Filter size={20} style={{ color: "#4b5563" }} />
          </button>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead
                style={{
                  background: "linear-gradient(to right, #f9fafb, #f3f4f6)",
                }}
              >
                <tr>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      color: "#6b7280",
                    }}
                  >
                    BARCODE
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      color: "#6b7280",
                    }}
                  >
                    รายการสินค้า
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      color: "#6b7280",
                    }}
                  >
                    หมวดหมู่
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      color: "#6b7280",
                    }}
                  >
                    ราคาปัจจุบัน
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      color: "#6b7280",
                    }}
                  >
                    ราคาแนะนำ
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      color: "#6b7280",
                    }}
                  >
                    ส่วนต่าง
                  </th>
                  <th
                    style={{
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      color: "#6b7280",
                    }}
                  >
                    อัพเดทล่าสุด
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>
                {displayedItems.map((item) => (
                  <tr
                    key={item.Item}
                    onClick={() => handleItemClick && handleItemClick(item)}
                    style={{
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f1f5f9")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#111827",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {item.Item}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {item.PRODUCT_Thai_DESC}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          backgroundColor: "#dbeafe",
                          color: "#1e40af",
                        }}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {item.Selling_Price} บาท
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {item.Predicted_Price_DQN} บาท
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            padding: "0.25rem 0.5rem",
                            display: "inline-flex",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            borderRadius: "9999px",
                            backgroundColor:
                              item.dqnDiff > 0
                                ? "#dcfce7"
                                : item.dqnDiff < 0
                                ? "#fee2e2"
                                : "#f3f4f6",
                            color:
                              item.dqnDiff > 0
                                ? "#166534"
                                : item.dqnDiff < 0
                                ? "#b91c1c"
                                : "#1f2937",
                          }}
                        >
                          {item.dqnDiff > 0 ? (
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <TrendingUp
                                size={12}
                                style={{ marginRight: "0.25rem" }}
                              />
                              +{item.dqnDiff}
                            </span>
                          ) : item.dqnDiff < 0 ? (
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <TrendingDown
                                size={12}
                                style={{ marginRight: "0.25rem" }}
                              />
                              {item.dqnDiff}
                            </span>
                          ) : (
                            <span>0</span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Clock size={12} style={{ marginRight: "0.25rem" }} />
                        {item.lastUpdated}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ปุ่ม Load More */}
          {visibleItems < filteredItems.length && (
            <div
              style={{
                padding: "1rem",
                textAlign: "center",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                onClick={loadMoreItems}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  backgroundColor: "#f3f4f6",
                  color: "#4b5563",
                  border: "none",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e5e7eb")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f3f4f6")
                }
              >
                <ChevronDown size={16} style={{ marginRight: "0.5rem" }} />
                โหลดเพิ่มเติม ({filteredItems.length - visibleItems} รายการ)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popup Notification */}
      {showPopup && popupItem && (
        <Popup item={popupItem} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default MainPage;
