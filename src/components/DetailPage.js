import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  Calendar,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getWeeklyPriceHistory } from "./productData";

const DetailPage = ({
  selectedItem,
  handleBackToMain,
  priceComparisonData,
  handleUpdatePrice,
}) => {
  if (!selectedItem) return null;

  const [activeTab, setActiveTab] = useState("เครื่องดื่ม");
  const [priceHistoryView, setPriceHistoryView] = useState("weekly");
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [weeklyPriceData, setWeeklyPriceData] = useState([]);
  const [itemState, setItemState] = useState(selectedItem);
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
  });

  // Sync itemState when selectedItem changes
  useEffect(() => {
    setItemState(selectedItem);
  }, [selectedItem]);

  // Fetch weekly price history
  useEffect(() => {
    if (selectedItem) {
      const weeklyData = getWeeklyPriceHistory(selectedItem.Item);
      setWeeklyPriceData(weeklyData);
    }
  }, [selectedItem]);

  // Generate price alerts based on product category
  useEffect(() => {
    if (!selectedItem) return;

    let alerts = [];
    switch (selectedItem.category) {
      case "เครื่องดื่ม":
        if (selectedItem.PRODUCT_Thai_DESC.includes("คริสตัล")) {
          alerts = [
            {
              competitor: "Big C",
              change: -6,
              date: "3 ชั่วโมงที่แล้ว",
              action: "ลดราคา",
            },
            {
              competitor: "Lotus",
              change: -10,
              date: "6 ชั่วโมงที่แล้ว",
              action: "ลดราคา",
            },
          ];
        } else if (selectedItem.PRODUCT_Thai_DESC.includes("โค้ก")) {
          alerts = [
            {
              competitor: "Big C",
              change: -1,
              date: "13 เม.ย. 2025",
              action: "ลดราคา",
            },
            {
              competitor: "Gourmet",
              change: 2,
              date: "5 เม.ย. 2025",
              action: "เพิ่มราคา",
            },
          ];
        } else if (selectedItem.PRODUCT_Thai_DESC.includes("ทิปโก้")) {
          alerts = [
            {
              competitor: "Big C",
              change: 0,
              date: "8 เม.ย. 2025",
              action: "ยกเลิกจำหน่าย",
            },
          ];
        } else {
          alerts = [
            {
              competitor: "Gourmet",
              change: +1.5,
              date: "9 เม.ย. 2025",
              action: "เพิ่มราคา",
            },
          ];
        }
        break;
      case "อาหาร":
        if (selectedItem.PRODUCT_Thai_DESC.includes("บะหมี่")) {
          alerts = [
            {
              competitor: "Tops",
              change: 0,
              date: "14 เม.ย. 2025",
              action: "ยกเลิกจำหน่าย",
            },
          ];
        } else if (selectedItem.PRODUCT_Thai_DESC.includes("ข้าว")) {
          alerts = [
            {
              competitor: "Lotus",
              change: -5,
              date: "10 เม.ย. 2025",
              action: "ลดราคา",
            },
            {
              competitor: "Big C",
              change: -10,
              date: "5 เม.ย. 2025",
              action: "ลดราคา",
            },
          ];
        } else {
          alerts = [
            {
              competitor: "Gourmet",
              change: +3,
              date: "7 เม.ย. 2025",
              action: "เพิ่มราคา",
            },
          ];
        }
        break;
      case "ขนม":
        alerts = [
          {
            competitor: "Big C",
            change: -2,
            date: "11 เม.ย. 2025",
            action: "ลดราคา",
          },
          {
            competitor: "Lotus",
            change: 0,
            date: "3 เม.ย. 2025",
            action: "ยกเลิกจำหน่าย",
          },
        ];
        break;
      case "ของใช้":
        alerts = [
          {
            competitor: "Big C",
            change: +4,
            date: "6 ชั่วโมงที่แล้ว",
            action: "เพิ่มราคา",
          },
          {
            competitor: "Gourmet",
            change: -3,
            date: "8 เม.ย. 2025",
            action: "ลดราคา",
          },
        ];
        break;
      default:
        alerts = [
          {
            competitor: "Lotus",
            change: -0.5,
            date: "2 ชั่วโมงที่แล้ว",
            action: "ลดราคา",
          },
        ];
    }
    setPriceAlerts(alerts);
  }, [selectedItem]);

  // Get business information
  const getBusinessInfo = () => {
    let strategy = "Red";
    let profitMargin = "30%";
    let unitSold = 2850;

    if (selectedItem.category === "เครื่องดื่ม") {
      if (selectedItem.Selling_Price > 100) {
        strategy = "Green";
        profitMargin = "45%";
        unitSold = 1200;
      } else if (selectedItem.Selling_Price > 20) {
        strategy = "Red";
        profitMargin = "35%";
        unitSold = 1800;
      }
    } else if (selectedItem.category === "อาหาร") {
      if (selectedItem.Selling_Price > 100) {
        strategy = "Green";
        profitMargin = "40%";
        unitSold = 950;
      } else {
        strategy = "Red";
        profitMargin = "25%";
        unitSold = 3200;
      }
    } else if (selectedItem.category === "ขนม") {
      strategy = "Orange";
      profitMargin = "35%";
      unitSold = 2100;
    } else if (selectedItem.category === "ของใช้") {
      strategy = "Red";
      profitMargin = "28%";
      unitSold = 1650;
    }

    return { strategy, profitMargin, unitSold };
  };

  const businessInfo = getBusinessInfo();

  // Predict units sold based on price change
  const predictUnitsSold = (newPrice, currentPrice, currentUnits) => {
    if (newPrice === currentPrice) return currentUnits;
    const priceChangePercent = ((newPrice - currentPrice) / currentPrice) * 100;
    const elasticity = 1.5; // 1% price change -> 1.5% opposite sales change
    const salesChangePercent = -priceChangePercent * elasticity;
    const newUnits = currentUnits * (1 + salesChangePercent / 100);
    return Math.round(Math.max(0, newUnits)); // Ensure non-negative, round to integer
  };

  // Calculate revenue and % increase
  const calculateRevenueStats = (price, units, currentRevenue) => {
    const revenue = price * units;
    const revenueChangePercent =
      currentRevenue !== 0
        ? ((revenue - currentRevenue) / currentRevenue) * 100
        : 0;
    return {
      revenue: revenue.toFixed(2),
      revenueChangePercent: revenueChangePercent.toFixed(1),
    };
  };

  // Compute predictions for XGBoost and DQN
  const currentRevenue = itemState.Selling_Price * businessInfo.unitSold;
  const xgboostUnits = predictUnitsSold(
    itemState.Predicted_Price_XGBoost,
    itemState.Selling_Price,
    businessInfo.unitSold
  );
  const dqnUnits = predictUnitsSold(
    itemState.Predicted_Price_DQN,
    itemState.Selling_Price,
    businessInfo.unitSold
  );
  const xgboostStats = calculateRevenueStats(
    itemState.Predicted_Price_XGBoost,
    xgboostUnits,
    currentRevenue
  );
  const dqnStats = calculateRevenueStats(
    itemState.Predicted_Price_DQN,
    dqnUnits,
    currentRevenue
  );

  // Handle price adjustment to DQN
  const adjustPriceToDQN = () => {
    const newSellingPrice = itemState.Predicted_Price_DQN;
    const updatedItem = {
      ...itemState,
      Selling_Price: newSellingPrice,
      xgboostDiff: itemState.Predicted_Price_XGBoost - newSellingPrice,
      dqnDiff: 0, // Since Selling_Price now equals Predicted_Price_DQN
      lastUpdated: "15 เม.ย. 2025, 12:00", // Current date/time
    };

    // Update weekly price data (latest entry)
    setWeeklyPriceData((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        Tops: newSellingPrice,
      };
      return updated;
    });

    // Update item state
    setItemState(updatedItem);

    // Show notification
    setNotification({
      message: "ราคาจะถูกอัพเดทใน 10 นาที",
      visible: true,
    });
    setTimeout(() => {
      setNotification({ message: "", visible: false });
    }, 5000);

    // Notify parent (if handleUpdatePrice exists)
    if (handleUpdatePrice) {
      handleUpdatePrice(updatedItem);
    }
  };

  // Map Thai months to English for display
  const monthMapping = {
    "ธ.ค.": "Dec-24",
    "ม.ค.": "Jan-25",
    "ก.พ.": "Feb-25",
    "มี.ค.": "Mar-25",
    "เม.ย.": "Apr-25",
  };

  // Transform priceHistory data for the graph
  const monthlyPriceData = itemState.priceHistory.map((history) => ({
    month: monthMapping[history.month] || history.month,
    Tops:
      history.month === "เม.ย." &&
      itemState.Selling_Price !== selectedItem.Selling_Price
        ? itemState.Selling_Price
        : history.Tops,
    BigC: history.BigC,
    Gourmet: history.Gourmet,
    Lotus: history.Lotus,
    CompetitorAvg: history.CompetitorAvg,
  }));

  return (
    <div style={{ padding: "1rem" }}>
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

      <button
        onClick={handleBackToMain}
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          color: "#2563eb",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={18} style={{ marginRight: "0.25rem" }} />
        กลับไปหน้าหลัก
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              padding: "1.5rem 1.5rem 1rem 1.5rem",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  {itemState.PRODUCT_Thai_DESC}
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span style={{ fontWeight: "500", marginRight: "0.5rem" }}>
                    Barcode:
                  </span>
                  <span>{itemState.Item}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                    }}
                  >
                    {itemState.category}
                  </span>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      backgroundColor: "#f3e8ff",
                      color: "#6d28d9",
                    }}
                  >
                    {businessInfo.strategy}
                  </span>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      backgroundColor: "#f3f4f6",
                      color: "#1f2937",
                    }}
                  >
                    กรุงเทพฯ
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Clock size={14} style={{ marginRight: "0.25rem" }} />
                อัพเดทล่าสุด: {itemState.lastUpdated}
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
            {[itemState.category, businessInfo.strategy, "กรุงเทพฯ"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "0.75rem 1.25rem",
                    backgroundColor:
                      activeTab === tab ? "white" : "transparent",
                    borderBottom:
                      activeTab === tab ? "2px solid #2563eb" : "none",
                    color: activeTab === tab ? "#2563eb" : "#6b7280",
                    fontWeight: activeTab === tab ? "500" : "normal",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                  }}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          {/* Price Information */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                background: "linear-gradient(to right, #ebf8ff, #e6f7ff)",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "#1e40af",
                }}
              >
                ราคาปัจจุบัน
              </h3>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#172554",
                  marginBottom: "1rem",
                }}
              >
                {itemState.Selling_Price} บาท
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "500" }}>กลยุทธ์:</span>{" "}
                {businessInfo.strategy}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "500" }}>อัตรากำไร:</span>{" "}
                {businessInfo.profitMargin}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                }}
              >
                <span style={{ fontWeight: "500" }}>ยอดขาย:</span>{" "}
                {businessInfo.unitSold} หน่วย
              </div>
            </div>

            <div
              style={{
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                background:
                  itemState.xgboostDiff >= 0
                    ? "linear-gradient(to right, #f0fff4, #dcfce7)"
                    : "linear-gradient(to right, #fff1f2, #fee2e2)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "#1f2937",
                }}
              >
                {itemState.xgboostDiff > 0
                  ? "ควรเพิ่มราคา (XGBoost)"
                  : itemState.xgboostDiff < 0
                  ? "ควรลดราคา (XGBoost)"
                  : "ราคาเหมาะสม (XGBoost)"}
              </h3>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                {itemState.Predicted_Price_XGBoost} บาท
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                คาดว่าจะขายได้ {xgboostUnits} ชิ้น, ยอดขาย{" "}
                {xgboostStats.revenue} บาท (
                {xgboostStats.revenueChangePercent !== "0.0"
                  ? `${xgboostStats.revenueChangePercent > 0 ? "+" : ""}${
                      xgboostStats.revenueChangePercent
                    }%`
                  : "คงที่"}{" "}
                จากราคาปัจจุบัน)
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.75rem",
                  fontSize: "1rem",
                  color:
                    itemState.xgboostDiff > 0
                      ? "#166534"
                      : itemState.xgboostDiff < 0
                      ? "#b91c1c"
                      : "#6b7280",
                }}
              >
                {itemState.xgboostDiff > 0 ? (
                  <>
                    <TrendingUp size={16} style={{ marginRight: "0.375rem" }} />
                    +{itemState.xgboostDiff} บาท
                  </>
                ) : itemState.xgboostDiff < 0 ? (
                  <>
                    <TrendingDown
                      size={16}
                      style={{ marginRight: "0.375rem" }}
                    />
                    {itemState.xgboostDiff} บาท
                  </>
                ) : (
                  "ไม่เปลี่ยนแปลง"
                )}
              </div>
            </div>

            <div
              style={{
                padding: "1.5rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                background: "linear-gradient(to right, #fff1f2, #fee2e2)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "#1f2937",
                }}
              >
                {itemState.dqnDiff < 0
                  ? "ควรลดราคา (DQN)"
                  : "ราคาเหมาะสม (DQN)"}
              </h3>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                {itemState.Predicted_Price_DQN} บาท
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                คาดว่าจะขายได้ {dqnUnits} ชิ้น, ยอดขาย {dqnStats.revenue} บาท (
                {dqnStats.revenueChangePercent !== "0.0"
                  ? `${dqnStats.revenueChangePercent > 0 ? "+" : ""}${
                      dqnStats.revenueChangePercent
                    }%`
                  : "คงที่"}{" "}
                จากราคาปัจจุบัน)
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                  fontSize: "1rem",
                  color: itemState.dqnDiff < 0 ? "#b91c1c" : "#6b7280",
                }}
              >
                {itemState.dqnDiff < 0 ? (
                  <>
                    <TrendingDown
                      size={16}
                      style={{ marginRight: "0.375rem" }}
                    />
                    {itemState.dqnDiff} บาท
                  </>
                ) : (
                  "ไม่เปลี่ยนแปลง"
                )}
              </div>
              <button
                onClick={adjustPriceToDQN}
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
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                <Zap size={16} style={{ marginRight: "0.5rem" }} />
                ปรับราคาตาม AI (DQN)
              </button>
            </div>
          </div>
          {/* Price Alerts */}
          <div style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "#1f2937",
              }}
            >
              การแจ้งเตือนราคาล่าสุด
            </h3>
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
            >
              {priceAlerts.length > 0 ? (
                priceAlerts.map((alert, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "1rem",
                      backgroundColor: "#fff",
                      borderBottom:
                        index < priceAlerts.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {alert.action === "ลดราคา" ? (
                        <TrendingDown
                          size={20}
                          style={{ color: "#dc2626", marginRight: "0.75rem" }}
                        />
                      ) : alert.action === "เพิ่มราคา" ? (
                        <TrendingUp
                          size={20}
                          style={{ color: "#16a34a", marginRight: "0.75rem" }}
                        />
                      ) : (
                        <AlertCircle
                          size={20}
                          style={{ color: "#f59e0b", marginRight: "0.75rem" }}
                        />
                      )}
                      <div>
                        <div
                          style={{ fontWeight: "500", marginBottom: "0.25rem" }}
                        >
                          {alert.competitor}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                          {alert.action === "ยกเลิกจำหน่าย"
                            ? "ยกเลิกจำหน่ายสินค้า"
                            : `ราคา${
                                alert.action === "ลดราคา" ? "ลดลง" : "เพิ่มขึ้น"
                              } ${Math.abs(alert.change)} บาท`}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {alert.date}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "#6b7280",
                  }}
                >
                  ไม่มีการแจ้งเตือนราคาล่าสุด
                </div>
              )}
            </div>
          </div>
          {/* Price Trend Graph */}
          <div
            style={{
              backgroundColor: "white",
              padding: "0 1.5rem 1.5rem 1.5rem",
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
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                ราคาเทียบคู่แข่งย้อนหลัง
              </h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => setPriceHistoryView("weekly")}
                  style={{
                    padding: "0.375rem 0.75rem",
                    backgroundColor:
                      priceHistoryView === "weekly" ? "#2563eb" : "#f1f5f9",
                    color: priceHistoryView === "weekly" ? "white" : "#64748b",
                    border: "none",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Calendar size={14} style={{ marginRight: "0.25rem" }} />
                  รายสัปดาห์
                </button>
                <button
                  onClick={() => setPriceHistoryView("monthly")}
                  style={{
                    padding: "0.375rem 0.75rem",
                    backgroundColor:
                      priceHistoryView === "monthly" ? "#2563eb" : "#f1f5f9",
                    color: priceHistoryView === "monthly" ? "white" : "#64748b",
                    border: "none",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Calendar size={14} style={{ marginRight: "0.25rem" }} />
                  รายเดือน
                </button>
              </div>
            </div>

            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={
                    priceHistoryView === "weekly"
                      ? weeklyPriceData
                      : monthlyPriceData
                  }
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey={priceHistoryView === "weekly" ? "date" : "month"}
                    tick={{ fontSize: 12 }}
                    angle={priceHistoryView === "weekly" ? -45 : 0}
                    textAnchor={
                      priceHistoryView === "weekly" ? "end" : "middle"
                    }
                    height={60}
                    label={{
                      value: priceHistoryView === "weekly" ? "วันที่" : "เดือน",
                      position: "insideBottom",
                      offset: -10,
                    }}
                  />
                  <YAxis
                    domain={[
                      (dataMin) => Math.floor(dataMin * 0.95),
                      (dataMax) => Math.ceil(dataMax * 1.05),
                    ]}
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "ราคา (บาท)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    formatter={(value, name) => [`${value} บาท`, name]}
                    labelFormatter={(label) =>
                      priceHistoryView === "weekly"
                        ? `วันที่ ${label}`
                        : `เดือน ${label}`
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Tops"
                    stroke="#ef4444"
                    name="Tops"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="CompetitorAvg"
                    stroke="#3b82f6"
                    name="ค่าเฉลี่ยคู่แข่ง"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="BigC"
                    stroke="#10b981"
                    name="Big C"
                    strokeWidth={1}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Gourmet"
                    stroke="#f59e0b"
                    name="Gourmet"
                    strokeWidth={1}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Lotus"
                    stroke="#8b5cf6"
                    name="Lotus"
                    strokeWidth={1}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Additional Info for Weekly View */}
            {priceHistoryView === "weekly" && (
              <div
                style={{
                  marginTop: "1rem",
                  fontSize: "0.875rem",
                  color: "#64748b",
                }}
              >
                <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                  ข้อมูลเพิ่มเติม:
                </div>
                <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                  <li>
                    แสดงข้อมูลย้อนหลัง 12 สัปดาห์ถึงวันที่{" "}
                    {weeklyPriceData.length > 0
                      ? weeklyPriceData[weeklyPriceData.length - 1].date
                      : "N/A"}
                  </li>
                  <li>ข้อมูลแสดงราคาของ Tops และค่าเฉลี่ยคู่แข่ง</li>
                  <li>ใช้สำหรับวิเคราะห์แนวโน้มราคาระยะสั้น</li>
                </ul>
              </div>
            )}
          </div>
          {/* Weekly Price Table */}
          <div style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "#1f2937",
              }}
            >
              ตารางราคารายสัปดาห์
            </h3>
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                overflow: "auto",
                maxHeight: "300px",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc" }}>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      สัปดาห์
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      วันที่
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "right",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      Tops (บาท)
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "center",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      การเปลี่ยนแปลง
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "center",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      ตำแหน่งคู่แข่ง
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "right",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      Big C (บาท)
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "right",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      Gourmet (บาท)
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "right",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      Lotus (บาท)
                    </th>
                    <th
                      style={{
                        padding: "0.75rem 1rem",
                        textAlign: "right",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      คู่แข่ง (บาท)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyPriceData.map((data, index) => {
                    // Calculate Tops price change from previous week
                    const prevTops =
                      index > 0 ? weeklyPriceData[index - 1].Tops : null;
                    const topsChange =
                      prevTops !== null ? data.Tops - prevTops : null;

                    // Determine competitive position
                    let position = "";
                    let positionColor = "";
                    if (data.Tops < data.CompetitorAvg) {
                      position = "ถูกกว่า";
                      positionColor = "#16a34a"; // Green
                    } else if (data.Tops > data.CompetitorAvg) {
                      position = "แพงกว่า";
                      positionColor = "#dc2626"; // Red
                    } else {
                      position = "เท่ากัน";
                      positionColor = "#4b5563"; // Neutral
                    }

                    return (
                      <tr key={index}>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            color: "#1f2937",
                          }}
                        >
                          {data.week}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            color: "#1f2937",
                          }}
                        >
                          {data.date || "N/A"}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            color: "#1f2937",
                            textAlign: "right",
                          }}
                        >
                          {data.Tops}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color:
                              topsChange > 0
                                ? "#dc2626"
                                : topsChange < 0
                                ? "#16a34a"
                                : "#4b5563",
                          }}
                        >
                          {topsChange !== null ? (
                            <>
                              {topsChange > 0 ? (
                                <TrendingUp
                                  size={14}
                                  style={{ marginRight: "0.25rem" }}
                                />
                              ) : topsChange < 0 ? (
                                <TrendingDown
                                  size={14}
                                  style={{ marginRight: "0.25rem" }}
                                />
                              ) : null}
                              {topsChange !== 0
                                ? `${
                                    topsChange > 0 ? "+" : ""
                                  }${topsChange.toFixed(2)}`
                                : "คงที่"}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            color: positionColor,
                            textAlign: "center",
                          }}
                        >
                          {position}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            color: "#1f2937",
                            textAlign: "right",
                          }}
                        >
                          {data.BigC}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            color: "#1f2937",
                            textAlign: "right",
                          }}
                        >
                          {data.Gourmet}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            color: "#1f2937",
                            textAlign: "right",
                          }}
                        >
                          {data.Lotus}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 1rem",
                            fontSize: "0.875rem",
                            color: "#1f2937",
                            textAlign: "right",
                          }}
                        >
                          {data.CompetitorAvg}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={9}
                      style={{
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                        color: "#4b5563",
                        backgroundColor: "#f8fafc",
                        textAlign: "left",
                      }}
                    >
                      <strong>สรุป:</strong>{" "}
                      {weeklyPriceData.length > 1
                        ? (() => {
                            const firstTops = weeklyPriceData[0].Tops;
                            const lastTops =
                              weeklyPriceData[weeklyPriceData.length - 1].Tops;
                            const totalChange = lastTops - firstTops;
                            return totalChange !== 0
                              ? `ราคา Tops เปลี่ยนแปลง ${
                                  totalChange > 0 ? "+" : ""
                                }${totalChange.toFixed(2)} บาท ใน 12 สัปดาห์`
                              : "ราคา Tops คงที่ตลอด 12 สัปดาห์";
                          })()
                        : "ไม่มีข้อมูลเพียงพอสำหรับสรุป"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
