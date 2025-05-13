import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";
import {
  Calendar,
  List,
  Activity,
  Info,
  Search,
  Filter,
  Download,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Zap,
  Sparkles,
  BarChart2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import debounce from "lodash/debounce";
import productData, {
  getCompetitorComparisonData,
  getPriceHistoryData,
  getWeeklyPriceHistory,
  getItemsToAdjust,
  getNotificationsData,
} from "./productData";

const COLORS = ["#3b82f6", "#10b981", "#f97316", "#8b5cf6"];
const storeColors = {
  Tops: "#ef4444",
  BigC: "#3b82f6",
  Gourmet: "#f97316",
  Lotus: "#10b981",
  CompetitorAvg: "#8b5cf6",
};

const InsightCard = ({ title, description, icon: Icon, color, action }) => (
  <div
    style={{
      padding: "16px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      borderLeft: `4px solid ${color}`,
      marginBottom: "12px",
      transition: "transform 0.2s",
      cursor: action ? "pointer" : "default",
    }}
    onClick={action}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      <Icon size={18} style={{ color, marginRight: "8px" }} />
      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937" }}>
        {title}
      </h3>
    </div>
    <p style={{ fontSize: "14px", color: "#475569" }}>{description}</p>
  </div>
);

const VisualizationPage = ({ handleBackToMain, handleItemClick }) => {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [priceHistoryView, setPriceHistoryView] = useState("monthly");
  const [weeklyPriceData, setWeeklyPriceData] = useState([]);
  const [priceHistoryData, setPriceHistoryData] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);
  const [itemsToAdjust, setItemsToAdjust] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["ทั้งหมด", "เครื่องดื่ม", "อาหาร", "ขนม", "ของใช้"];
  const competitorComparisonData = getCompetitorComparisonData();

  useEffect(() => {
    setIsLoading(true);
    setNotificationsData(getNotificationsData());
    setItemsToAdjust(getItemsToAdjust());
    setPriceHistoryData(getPriceHistoryData());
    const firstItemBarcode = "8851123212012";
    setWeeklyPriceData(getWeeklyPriceHistory(firstItemBarcode));
    setTimeout(() => setIsLoading(false), 500); // Simulate async load
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const selectedItem = competitorComparisonData.find(
        (item) => item.name === selectedProduct
      );
      if (selectedItem && selectedItem.barcode) {
        setIsLoading(true);
        setPriceHistoryData(getPriceHistoryData(selectedItem.barcode));
        setWeeklyPriceData(getWeeklyPriceHistory(selectedItem.barcode));
        setTimeout(() => setIsLoading(false), 300);
      }
    } else {
      setIsLoading(true);
      setPriceHistoryData(getPriceHistoryData());
      setWeeklyPriceData(getWeeklyPriceHistory("8851123212012"));
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [selectedProduct]);

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  const filteredData = useMemo(() => {
    let data =
      selectedCategory === "ทั้งหมด"
        ? competitorComparisonData
        : competitorComparisonData.filter(
            (item) => item.category === selectedCategory
          );
    if (searchTerm) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  }, [selectedCategory, searchTerm]);

  const dataWithAverage = useMemo(
    () =>
      filteredData.map((item) => {
        const competitors = [item.BigC, item.Gourmet, item.Lotus];
        const avgPrice = competitors.reduce((sum, price) => sum + price, 0) / 3;
        return { ...item, ค่าเฉลี่ยคู่แข่ง: parseFloat(avgPrice.toFixed(2)) };
      }),
    [filteredData]
  );

  const categoryCounts = useMemo(
    () =>
      categories.slice(1).map((category) => ({
        name: category,
        value: competitorComparisonData.filter(
          (item) => item.category === category
        ).length,
      })),
    []
  );

  const insights = useMemo(() => {
    const overpriced = dataWithAverage.filter(
      (item) => item.Tops > item.ค่าเฉลี่ยคู่แข่ง + 2
    );
    const underpriced = dataWithAverage.filter(
      (item) => item.Tops < item.ค่าเฉลี่ยคู่แข่ง - 2
    );
    const topOverpriced = overpriced
      .sort(
        (a, b) => b.Tops - b.ค่าเฉลี่ยคู่แข่ง - (a.Tops - a.ค่าเฉลี่ยคู่แข่ง)
      )
      .slice(0, 3);
    const projectedRevenueLift =
      overpriced.reduce(
        (sum, item) => sum + (item.Tops - item.ค่าเฉลี่ยคู่แข่ง) * 100,
        0
      ) * 0.1;

    return [
      {
        title: "สินค้าราคาสูงเกินไป",
        description: `พบ ${overpriced.length} รายการที่มีราคาสูงกว่าคู่แข่งเกิน 2 บาท เสี่ยงเสียส่วนแบ่งการตลาด`,
        icon: AlertTriangle,
        color: "#ef4444",
        action: () => setSelectedProduct(topOverpriced[0]?.name || ""),
      },
      {
        title: "โอกาสเพิ่มกำไร",
        description: `พบ ${
          underpriced.length
        } รายการที่สามารถปรับราคาขึ้นได้โดยไม่กระทบยอดขาย คาดเพิ่มรายได้ ${projectedRevenueLift.toFixed(
          0
        )} บาท/เดือน`,
        icon: CheckCircle,
        color: "#10b981",
      },
      {
        title: "คำแนะนำจาก AI",
        description: `ปรับราคา ${itemsToAdjust.length} รายการตาม DQN คาดเพิ่มกำไร 10-15% ใน 3 เดือน`,
        icon: Sparkles,
        color: "#2563eb",
      },
    ];
  }, [dataWithAverage, itemsToAdjust]);

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in { animation: fadeIn 0.3s ease-out; }
          .table-container { position: relative; }
          .table-container thead th { position: sticky; top: 0; background: #f8fafc; z-index: 10; }
          .loading-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>

      <div className="fade-in" style={{ marginBottom: "16px" }}>
        <button
          onClick={handleBackToMain}
          style={{
            display: "flex",
            alignItems: "center",
            border: "none",
            background: "transparent",
            color: "#2563eb",
            cursor: "pointer",
            padding: "8px 0",
            fontSize: "14px",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#1e40af")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#2563eb")}
        >
          <ArrowLeft size={16} style={{ marginRight: "4px" }} />
          กลับไปหน้าหลัก
        </button>
      </div>

      <div className="fade-in" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e40af" }}>
          วิเคราะห์ข้อมูลราคาสินค้า
        </h1>
        <p style={{ color: "#64748b", fontSize: "16px" }}>
          ค้นพบโอกาสการแข่งขันด้วยข้อมูลเปรียบเทียบราคาและคำแนะนำจาก AI
        </p>
      </div>

      <div
        className="fade-in"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          {
            title: "สินค้าทั้งหมด",
            value: 300,
            color: "#1e40af",
            gradient: "#ebf8ff, #e6f7ff",
          },
          {
            title: "ควรปรับราคา",
            value: 20,
            color: "#047857",
            gradient: "#f0fff4, #e6ffed",
          },
          {
            title: "แจ้งเตือน",
            value: notificationsData.length,
            color: "#6d28d9",
            gradient: "#f5f3ff, #ede9fe",
          },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: `linear-gradient(to right, ${stat.gradient})`,
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "16px",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3
              style={{
                fontSize: "14px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              {stat.title}
            </h3>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: stat.color,
              }}
            >
              {stat.value} รายการ
            </div>
          </div>
        ))}
      </div>

      <div
        className="fade-in"
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label
            style={{
              fontSize: "14px",
              color: "#475569",
              marginBottom: "4px",
              display: "block",
            }}
          >
            หมวดหมู่
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              minWidth: "160px",
              background: "#fff",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            style={{
              fontSize: "14px",
              color: "#475569",
              marginBottom: "4px",
              display: "block",
            }}
          >
            สินค้า
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              minWidth: "240px",
              background: "#fff",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          >
            <option value="">ทั้งหมด</option>
            {filteredData.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <div style={{ position: "relative" }}>
            <label
              style={{
                fontSize: "14px",
                color: "#475569",
                marginBottom: "4px",
                display: "block",
              }}
            >
              ค้นหาสินค้า
            </label>
            <input
              type="text"
              placeholder="ค้นหาตามชื่อสินค้า..."
              onChange={(e) => debouncedSearch(e.target.value)}
              style={{
                padding: "8px 12px",
                paddingLeft: "36px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                width: "240px",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                bottom: "11px",
                color: "#94a3b8",
              }}
            />
          </div>
          <button
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              backgroundColor: "#e2e8f0",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#d1d5db")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#e2e8f0")
            }
          >
            <Filter size={16} style={{ marginRight: "4px" }} />
            กรอง
          </button>
        </div>
      </div>

      <div
        className="fade-in"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
            }}
          >
            เปรียบเทียบราคาคู่แข่ง
          </h2>
          <div style={{ height: "400px" }}>
            {isLoading ? (
              <div
                style={{
                  height: "100%",
                  background: "#f0f0f0",
                  borderRadius: "8px",
                }}
                className="loading-skeleton"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    selectedProduct
                      ? dataWithAverage.filter(
                          (item) => item.name === selectedProduct
                        )
                      : dataWithAverage
                  }
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} บาท`} />
                  <Legend />
                  <Bar dataKey="Tops" fill={storeColors.Tops} name="Tops" />
                  <Bar dataKey="BigC" fill={storeColors.BigC} name="Big C" />
                  <Bar
                    dataKey="Gourmet"
                    fill={storeColors.Gourmet}
                    name="Gourmet"
                  />
                  <Bar dataKey="Lotus" fill={storeColors.Lotus} name="Lotus" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
            }}
          >
            สัดส่วนสินค้าตามหมวดหมู่
          </h2>
          <div style={{ height: "300px" }}>
            {isLoading ? (
              <div
                style={{
                  height: "100%",
                  background: "#f0f0f0",
                  borderRadius: "8px",
                }}
                className="loading-skeleton"
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryCounts}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryCounts.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} รายการ`,
                      `หมวดหมู่: ${name}`,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div style={{ marginTop: "16px" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              หมวดหมู่ทั้งหมด
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {categories.slice(1).map((category, index) => (
                <div
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "16px",
                    backgroundColor:
                      selectedCategory === category ? COLORS[index] : "#f1f5f9",
                    color: selectedCategory === category ? "white" : "#64748b",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background-color 0.2s",
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="fade-in"
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>
            แนวโน้มราคาและการพยากรณ์
          </h2>
          <div style={{ display: "flex", gap: "8px" }}>
            {["weekly", "monthly"].map((view) => (
              <button
                key={view}
                onClick={() => setPriceHistoryView(view)}
                style={{
                  padding: "6px 12px",
                  backgroundColor:
                    priceHistoryView === view ? "#2563eb" : "#f1f5f9",
                  color: priceHistoryView === view ? "white" : "#64748b",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                <Calendar size={14} style={{ marginRight: "4px" }} />
                {view === "weekly" ? "รายสัปดาห์" : "รายเดือน"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ height: "400px" }}>
          {isLoading ? (
            <div
              style={{
                height: "100%",
                background: "#f0f0f0",
                borderRadius: "8px",
              }}
              className="loading-skeleton"
            />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={
                  priceHistoryView === "weekly"
                    ? weeklyPriceData
                    : priceHistoryData
                }
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={priceHistoryView === "weekly" ? "week" : "month"}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) =>
                    priceHistoryView === "weekly"
                      ? `${label} (${
                          weeklyPriceData.find((d) => d.week === label)?.date ||
                          label
                        })`
                      : `เดือน ${label}`
                  }
                  formatter={(value) => `${value} บาท`}
                />
                <Legend />
                {priceHistoryView === "weekly" ? (
                  <>
                    <Line
                      type="monotone"
                      dataKey="Tops"
                      stroke={storeColors.Tops}
                      name="Tops"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="CompetitorAvg"
                      stroke={storeColors.CompetitorAvg}
                      name="ค่าเฉลี่ยคู่แข่ง"
                      strokeWidth={2}
                    />
                    {weeklyPriceData.some(
                      (d) => Math.abs(d.Tops - d.CompetitorAvg) > 2
                    ) && (
                      <ReferenceLine
                        y={
                          weeklyPriceData[weeklyPriceData.length - 1]
                            ?.CompetitorAvg
                        }
                        stroke="#8b5cf6"
                        strokeDasharray="3 3"
                        label={{
                          value: "คู่แข่ง",
                          position: "insideTopRight",
                          fill: "#8b5cf6",
                        }}
                      />
                    )}
                  </>
                ) : (
                  ["Tops", "BigC", "Gourmet", "Lotus"].map((store) => (
                    <Line
                      key={store}
                      type="monotone"
                      dataKey={store}
                      stroke={storeColors[store]}
                      name={store}
                      strokeWidth={2}
                    />
                  ))
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        {priceHistoryView === "weekly" && selectedProduct && (
          <div
            style={{
              marginTop: "16px",
              fontSize: "14px",
              color: "#64748b",
              padding: "12px",
              backgroundColor: "#f8fafc",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                color: "#1e40af",
              }}
            >
              <Info size={16} style={{ marginRight: "6px" }} />
              <span style={{ fontWeight: "500" }}>ข้อมูลราคารายสัปดาห์</span>
            </div>
            <p style={{ margin: "0 0 8px 0" }}>
              แสดงราคาย้อนหลัง 12 สัปดาห์ของ <strong>{selectedProduct}</strong>{" "}
              เทียบกับคู่แข่ง
            </p>
            <p style={{ margin: "0" }}>
              ข้อมูลล่าสุด:{" "}
              {weeklyPriceData[weeklyPriceData.length - 1]?.date || ""}
            </p>
          </div>
        )}
        {priceHistoryView === "monthly" && (
          <div
            style={{
              marginTop: "8px",
              fontSize: "12px",
              color: "#64748b",
              textAlign: "right",
            }}
          >
            * เดือน เม.ย. เป็นการพยากรณ์จาก DQN
          </div>
        )}
      </div>

      {priceHistoryView === "weekly" && selectedProduct && (
        <div
          className="fade-in table-container"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "20px",
            marginBottom: "24px",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <List size={18} style={{ marginRight: "8px", color: "#2563eb" }} />
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                margin: 0,
              }}
            >
              ตารางราคารายสัปดาห์: {selectedProduct}
            </h2>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {[
                  "สัปดาห์",
                  "วันที่",
                  "Tops (บาท)",
                  "คู่แข่ง (บาท)",
                  "ส่วนต่าง",
                  "% เปลี่ยน",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "12px 16px",
                      textAlign:
                        header.includes("บาท") || header.includes("%")
                          ? "right"
                          : "left",
                      fontSize: "14px",
                      color: "#475569",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(5)
                    .fill()
                    .map((_, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        {Array(6)
                          .fill()
                          .map((_, j) => (
                            <td key={j} style={{ padding: "12px 16px" }}>
                              <div
                                style={{ height: "20px", borderRadius: "4px" }}
                                className="loading-skeleton"
                              />
                            </td>
                          ))}
                      </tr>
                    ))
                : weeklyPriceData.map((week, index) => {
                    const diff = week.Tops - week.CompetitorAvg;
                    const diffPercent = (
                      (diff / week.CompetitorAvg) *
                      100
                    ).toFixed(1);
                    return (
                      <tr
                        key={week.week}
                        style={{
                          borderBottom: "1px solid #e2e8f0",
                          backgroundColor:
                            index % 2 === 0 ? "white" : "#f8fafc",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: "14px",
                            color: "#1f2937",
                          }}
                        >
                          {week.week}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: "14px",
                            color: "#64748b",
                          }}
                        >
                          {week.date}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            textAlign: "right",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#1f2937",
                          }}
                        >
                          {week.Tops}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            textAlign: "right",
                            fontSize: "14px",
                            color: "#64748b",
                          }}
                        >
                          {week.CompetitorAvg}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            textAlign: "right",
                            fontSize: "14px",
                            fontWeight: "500",
                            color:
                              diff < 0
                                ? "#16a34a"
                                : diff > 0
                                ? "#dc2626"
                                : "#6b7280",
                          }}
                        >
                          {diff > 0 ? "+" : ""}
                          {diff.toFixed(2)}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            textAlign: "right",
                            fontSize: "14px",
                            fontWeight: "500",
                            color:
                              diff < 0
                                ? "#16a34a"
                                : diff > 0
                                ? "#dc2626"
                                : "#6b7280",
                          }}
                        >
                          {diff > 0 ? "+" : ""}
                          {diffPercent}%
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          <div
            style={{
              marginTop: "16px",
              fontSize: "14px",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Activity size={16} style={{ marginRight: "6px" }} />
            <span>ราคาแสดงเป็นบาทต่อหน่วย อัพเดทล่าสุด: 15 เม.ย. 2025</span>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div
          className="fade-in"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Sparkles
              size={20}
              style={{ marginRight: "8px", color: "#2563eb" }}
            />
            คำแนะนำการปรับราคา: {selectedProduct}
          </h2>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f0f9ff",
              borderRadius: "8px",
              borderLeft: "4px solid #3b82f6",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#1e40af",
                marginBottom: "8px",
              }}
            >
              วิเคราะห์จาก DQN AI
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#475569",
                marginBottom: "12px",
              }}
            >
              ราคา <strong>{selectedProduct}</strong> เทียบกับคู่แข่ง แนะนำโดย
              DQN เพื่อเพิ่มยอดขายและกำไร
            </p>
            {weeklyPriceData.length > 0 &&
              (() => {
                const latest = weeklyPriceData[weeklyPriceData.length - 1];
                const diff = latest.Tops - latest.CompetitorAvg;
                const dqnItem = productData.find(
                  (p) => p.PRODUCT_Thai_DESC === selectedProduct
                );
                return (
                  <div style={{ padding: "8px 0" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#475569",
                        marginBottom: "4px",
                      }}
                    >
                      <strong>ราคาล่าสุด:</strong> {latest.Tops} บาท
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#475569",
                        marginBottom: "4px",
                      }}
                    >
                      <strong>คู่แข่ง:</strong> {latest.CompetitorAvg} บาท
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#475569",
                        marginBottom: "4px",
                      }}
                    >
                      <strong>แนะนำโดย DQN:</strong>{" "}
                      {dqnItem?.Predicted_Price_DQN || "-"} บาท
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color:
                          diff < 0
                            ? "#16a34a"
                            : diff > 0
                            ? "#dc2626"
                            : "#6b7280",
                      }}
                    >
                      <strong>ส่วนต่าง:</strong> {diff > 0 ? "+" : ""}
                      {diff.toFixed(2)} บาท (
                      {((diff / latest.CompetitorAvg) * 100).toFixed(1)}%)
                    </div>
                  </div>
                );
              })()}
          </div>
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1e40af")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
            >
              <TrendingDown size={16} style={{ marginRight: "4px" }} />
              ปรับราคา
            </button>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#f1f5f9",
                color: "#64748b",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onClick={() =>
                handleItemClick?.(
                  productData.find(
                    (p) => p.PRODUCT_Thai_DESC === selectedProduct
                  )
                )
              }
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e2e8f0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f1f5f9")
              }
            >
              <BarChart2 size={16} style={{ marginRight: "4px" }} />
              ดูรายละเอียด
            </button>
          </div>
        </div>
      )}

      <div
        className="fade-in table-container"
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "20px",
          marginBottom: "24px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>
            ตารางเปรียบเทียบราคา
          </h2>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "#f1f5f9",
                color: "#64748b",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e2e8f0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f1f5f9")
              }
            >
              <Download size={14} style={{ marginRight: "4px" }} />
              ส่งออก
            </button>
            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "#f1f5f9",
                color: "#64748b",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#e2e8f0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f1f5f9")
              }
            >
              <Zap size={14} style={{ marginRight: "4px" }} />
              ปรับอัตโนมัติ
            </button>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              {[
                "สินค้า",
                "Tops",
                "Big C",
                "Gourmet",
                "Lotus",
                "คู่แข่ง",
                "ส่วนต่าง",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "12px 16px",
                    textAlign: header === "สินค้า" ? "left" : "right",
                    fontSize: "14px",
                    color: "#475569",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(5)
                  .fill()
                  .map((_, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      {Array(7)
                        .fill()
                        .map((_, j) => (
                          <td key={j} style={{ padding: "12px 16px" }}>
                            <div
                              style={{ height: "20px", borderRadius: "4px" }}
                              className="loading-skeleton"
                            />
                          </td>
                        ))}
                    </tr>
                  ))
              : dataWithAverage.map((item, index) => {
                  const diff = item.Tops - item.ค่าเฉลี่ยคู่แข่ง;
                  const diffPercentage = (
                    (diff / item.ค่าเฉลี่ยคู่แข่ง) *
                    100
                  ).toFixed(1);
                  return (
                    <tr
                      key={item.name}
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        backgroundColor: index % 2 === 0 ? "white" : "#f8fafc",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedProduct(item.name)}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f1f5f9")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "white" : "#f8fafc")
                      }
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "14px",
                          color:
                            item.name === selectedProduct
                              ? "#2563eb"
                              : "#1f2937",
                          fontWeight:
                            item.name === selectedProduct ? "500" : "normal",
                        }}
                      >
                        {item.name}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#1f2937",
                        }}
                      >
                        {item.Tops}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                          fontSize: "14px",
                          color: "#64748b",
                        }}
                      >
                        {item.BigC}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                          fontSize: "14px",
                          color: "#64748b",
                        }}
                      >
                        {item.Gourmet}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                          fontSize: "14px",
                          color: "#64748b",
                        }}
                      >
                        {item.Lotus}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#1f2937",
                        }}
                      >
                        {item.ค่าเฉลี่ยคู่แข่ง}
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          textAlign: "right",
                          fontSize: "14px",
                          fontWeight: "500",
                          color:
                            diff > 0
                              ? "#ef4444"
                              : diff < 0
                              ? "#10b981"
                              : "#64748b",
                        }}
                      >
                        {diff > 0 ? "+" : ""}
                        {diff.toFixed(2)} ({diff > 0 ? "+" : ""}
                        {diffPercentage}%)
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          <Info size={14} style={{ marginRight: "4px" }} />
          คลิกที่ชื่อสินค้าเพื่อดูข้อมูลเพิ่มเติม
        </div>
      </div>

      <div
        className="fade-in"
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "16px",
          }}
        >
          ข้อมูลเชิงลึกสำหรับการแข่งขัน
        </h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}
        >
          {insights.map((insight, index) => (
            <InsightCard key={index} {...insight} />
          ))}
        </div>
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1e40af")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
            <Download size={14} style={{ marginRight: "4px" }} />
            ดาวน์โหลดข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPage;
