import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpDown,
  Download,
  RefreshCw,
  ChevronLeft,
  BarChart2,
  Filter,
  Home,
  Settings,
  Bell,
  CheckCircle,
  Globe,
  Activity,
  Clock,
  Zap,
  DollarSign,
  Target,
  Users,
  Shuffle,
} from "lucide-react";

// Import components
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainPage from "./MainPage";
import DetailPage from "./DetailPage";
import VisualizationPage from "./VisualizationPage";
import AISettingsPage from "./AISettingsPage";
import AutoSyncPage from "./AutoSyncPage";
import {
  sampleData,
  priceComparisonData,
  notificationsData,
} from "../data/mockData";

const DashboardWithVisualization = () => {
  const [view, setView] = useState("main");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visualizationTab, setVisualizationTab] = useState("price-comparison");
  const [visualizationProduct, setVisualizationProduct] =
    useState("8850999990001");
  const [notification, setNotification] = useState(null);
  const [showAppNotifications, setShowAppNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [autoPrice, setAutoPrice] = useState(false);

  const [aiWeights, setAiWeights] = useState({
    priceSensitivity: 30,
    rogStrategy: 25,
    profitMargin: 20,
    competitorSensitivity: 25,
  });

  const filteredItems = sampleData.filter(
    (item) =>
      item.Item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.PRODUCT_Thai_DESC.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsToAdjust = sampleData.filter((item) => item.shouldAdjust);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView("detail");
  };

  const handleBackToMain = () => {
    setView("main");
    setSelectedItem(null);
  };

  const handleGoToVisualization = () => {
    setView("visualization");
  };

  const handleGoToAISettings = () => {
    setView("ai-settings");
  };

  const handleUpdatePrices = () => {
    setNotification({
      type: "success",
      message: "อัพเดทราคาสินค้าเรียบร้อยแล้ว",
      duration: 3000,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const toggleAutoPrice = () => {
    setAutoPrice(!autoPrice);
    setNotification({
      type: "success",
      message: !autoPrice
        ? "เปิดใช้งานการปรับราคาอัตโนมัติแล้ว"
        : "ปิดการใช้งานการปรับราคาอัตโนมัติแล้ว",
      duration: 3000,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleWeightChange = (weight, value) => {
    const newValue = parseInt(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 100) return;

    setAiWeights((prev) => ({
      ...prev,
      [weight]: newValue,
    }));
  };

  const handleRecalculateWithWeights = () => {
    setNotification({
      type: "success",
      message: "คำนวณราคาใหม่ตามค่าถ่วงน้ำหนักเรียบร้อยแล้ว",
      duration: 3000,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const renderNotification = () => {
    if (!notification) return null;

    return (
      <div
        className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center animate-slide-in z-50 ${
          notification.type === "success"
            ? "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        {notification.type === "success" && (
          <CheckCircle size={20} className="mr-2" />
        )}
        <span>{notification.message}</span>
      </div>
    );
  };

  const renderNotificationsPanel = () => {
    if (!showAppNotifications) return null;

    const unreadCount = notificationsData.filter((n) => !n.read).length;

    return (
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto transition-all duration-300">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              การแจ้งเตือน
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <button
              onClick={() => setShowAppNotifications(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          {notificationsData.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              ไม่มีการแจ้งเตือนใหม่
            </div>
          ) : (
            <div className="space-y-3">
              {notificationsData.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg transition-colors duration-200 ${
                    notification.read ? "bg-gray-50" : "bg-blue-50"
                  } border ${
                    notification.read ? "border-gray-200" : "border-blue-200"
                  } hover:bg-gray-100`}
                >
                  <div className="flex justify-between">
                    <h4
                      className={`font-medium ${
                        notification.read ? "text-gray-800" : "text-blue-800"
                      }`}
                    >
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setView={setView}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Header
          view={view}
          activeTab={activeTab}
          selectedItem={selectedItem}
          handleBackToMain={handleBackToMain}
          showAppNotifications={showAppNotifications}
          setShowAppNotifications={setShowAppNotifications}
          notificationsData={notificationsData}
        />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: "#f3f4f6",
          }}
        >
          {activeTab === "dashboard" && view === "main" && (
            <MainPage
              itemsToAdjust={itemsToAdjust}
              sampleData={sampleData}
              notificationsData={notificationsData}
              setShowAppNotifications={setShowAppNotifications}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredItems={filteredItems}
              handleUpdatePrices={handleUpdatePrices}
              handleGoToVisualization={handleGoToVisualization}
              handleGoToAISettings={handleGoToAISettings}
              autoPrice={autoPrice}
              toggleAutoPrice={toggleAutoPrice}
              handleItemClick={handleItemClick}
            />
          )}
          {activeTab === "dashboard" && view === "detail" && (
            <DetailPage
              selectedItem={selectedItem}
              handleBackToMain={handleBackToMain}
              priceComparisonData={priceComparisonData}
            />
          )}
          {(view === "visualization" || activeTab === "market") && (
            <VisualizationPage className="bg-white p-6 rounded-lg shadow-md mb-6" />
          )}
          {(view === "ai-settings" || activeTab === "ai-settings") && (
            <AISettingsPage
              aiWeights={aiWeights}
              handleWeightChange={handleWeightChange}
              handleRecalculateWithWeights={handleRecalculateWithWeights}
            />
          )}
          {(view === "autosync" || activeTab === "autosync") && (
            <AutoSyncPage
              autoPrice={autoPrice}
              toggleAutoPrice={toggleAutoPrice}
              setNotification={setNotification}
            />
          )}
        </main>
      </div>
      {renderNotification()}
      {renderNotificationsPanel()}
    </div>
  );
};

export default DashboardWithVisualization;
