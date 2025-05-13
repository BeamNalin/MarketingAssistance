// productData.js - ไฟล์ข้อมูลสินค้าสำหรับใช้ร่วมกันในทุกหน้า

// ข้อมูลสินค้า 20 รายการ แบ่งเป็นหมวดหมู่เท่าๆกัน
const productData = [
  // เครื่องดื่ม - 5 รายการ
  {
    Item: "8851123212012",
    PRODUCT_Thai_DESC: "คริสตัล น้ำดื่ม 1500 มล. แพ็ค 6",
    Selling_Price: 55,
    Predicted_Price_XGBoost: 54,
    Predicted_Price_DQN: 49,
    xgboostDiff: 1,
    dqnDiff: -6,
    category: "เครื่องดื่ม",
    ROG_Strategy: "Red",
    region: "กรุงเทพฯ",
    profit_margin: 30,
    unitSold: 2850,
    lastUpdated: "3 ชั่วโมงที่แล้ว",
    competitorPrices: {
      Tops: 54,
      BigC: 49,
      Gourmet: 69,
      Lotus: 54,
    },
    priceAlerts: [
      {
        competitor: "Big C",
        change: -6,
        date: "12 เม.ย. 2025",
        action: "ลดราคา",
      },
      {
        competitor: "Lotus",
        change: -10,
        date: "10 เม.ย. 2025",
        action: "ลดราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 54,
        BigC: 49,
        Gourmet: 69,
        Lotus: 49,
        CompetitorAvg: 55.67,
      },
      {
        month: "ม.ค.",
        Tops: 63,
        BigC: 69,
        Gourmet: 81,
        Lotus: 66,
        CompetitorAvg: 72,
      },
      {
        month: "ก.พ.",
        Tops: 63,
        BigC: 69,
        Gourmet: 78,
        Lotus: 66,
        CompetitorAvg: 71,
      },
      {
        month: "มี.ค.",
        Tops: 60,
        BigC: 66,
        Gourmet: 78,
        Lotus: 63,
        CompetitorAvg: 69,
      },
      {
        month: "เม.ย.",
        Tops: 55,
        BigC: 49,
        Gourmet: 69,
        Lotus: 54,
        CompetitorAvg: 57.33,
      },
    ],
  },
  {
    Item: "8851123321155",
    PRODUCT_Thai_DESC: "โค้ก 500 ml",
    Selling_Price: 20,
    Predicted_Price_XGBoost: 21.5,
    Predicted_Price_DQN: 22,
    xgboostDiff: 1.5,
    dqnDiff: 2,
    category: "เครื่องดื่ม",
    ROG_Strategy: "Standard",
    region: "กรุงเทพฯ",
    profit_margin: 35,
    unitSold: 1800,
    lastUpdated: "3 ชั่วโมงที่แล้ว",
    competitorPrices: {
      Tops: 20,
      BigC: 19,
      Gourmet: 23,
      Lotus: 19.5,
    },
    priceAlerts: [
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
        action: "ยกเลิกจำหน่าย",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 21,
        BigC: 20,
        Gourmet: 24,
        Lotus: 20.5,
        CompetitorAvg: 21.5,
      },
      {
        month: "ม.ค.",
        Tops: 20.5,
        BigC: 19.5,
        Gourmet: 23.5,
        Lotus: 20,
        CompetitorAvg: 21,
      },
      {
        month: "ก.พ.",
        Tops: 20.5,
        BigC: 19.5,
        Gourmet: 23,
        Lotus: 19.5,
        CompetitorAvg: 20.7,
      },
      {
        month: "มี.ค.",
        Tops: 20,
        BigC: 19,
        Gourmet: 23,
        Lotus: 19.5,
        CompetitorAvg: 20.5,
      },
      {
        month: "เม.ย.",
        Tops: 20,
        BigC: 19,
        Gourmet: 23,
        Lotus: 19.5,
        CompetitorAvg: 20.5,
      },
    ],
  },
  {
    Item: "8851123111144",
    PRODUCT_Thai_DESC: "น้ำผลไม้ทิปโก้ 1000ml",
    Selling_Price: 45,
    Predicted_Price_XGBoost: 47,
    Predicted_Price_DQN: 45,
    xgboostDiff: 2,
    dqnDiff: 0,
    category: "เครื่องดื่ม",
    ROG_Strategy: "Premium",
    region: "กรุงเทพฯ",
    profit_margin: 45,
    unitSold: 1200,
    lastUpdated: "3 ชั่วโมงที่แล้ว",
    competitorPrices: {
      Tops: 45,
      BigC: 43,
      Gourmet: 48,
      Lotus: 44,
    },
    priceAlerts: [
      {
        competitor: "Big C",
        change: 0,
        date: "8 เม.ย. 2025",
        action: "ยกเลิกจำหน่าย",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 44,
        BigC: 42,
        Gourmet: 47,
        Lotus: 43,
        CompetitorAvg: 44,
      },
      {
        month: "ม.ค.",
        Tops: 44,
        BigC: 42,
        Gourmet: 47,
        Lotus: 43,
        CompetitorAvg: 44,
      },
      {
        month: "ก.พ.",
        Tops: 44.5,
        BigC: 42.5,
        Gourmet: 47.5,
        Lotus: 43.5,
        CompetitorAvg: 44.5,
      },
      {
        month: "มี.ค.",
        Tops: 45,
        BigC: 43,
        Gourmet: 48,
        Lotus: 44,
        CompetitorAvg: 45,
      },
      {
        month: "เม.ย.",
        Tops: 45,
        BigC: 43,
        Gourmet: 48,
        Lotus: 44,
        CompetitorAvg: 45,
      },
    ],
  },
  {
    Item: "8851123444789",
    PRODUCT_Thai_DESC: "โออิชิชาเขียวพร้อมดื่มรสน้ำผึ้งมะนาว 500ml",
    Selling_Price: 22,
    Predicted_Price_XGBoost: 24,
    Predicted_Price_DQN: 21,
    xgboostDiff: 2,
    dqnDiff: -1,
    category: "เครื่องดื่ม",
    ROG_Strategy: "Standard",
    region: "กรุงเทพฯ",
    profit_margin: 35,
    unitSold: 1600,
    lastUpdated: "3 ชั่วโมงที่แล้ว",
    competitorPrices: {
      Tops: 22,
      BigC: 23,
      Gourmet: 26,
      Lotus: 22.5,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: 1.5,
        date: "9 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 23,
        BigC: 24,
        Gourmet: 27,
        Lotus: 23.5,
        CompetitorAvg: 24.8,
      },
      {
        month: "ม.ค.",
        Tops: 22.5,
        BigC: 23.5,
        Gourmet: 26.5,
        Lotus: 23,
        CompetitorAvg: 24.3,
      },
      {
        month: "ก.พ.",
        Tops: 22.5,
        BigC: 23,
        Gourmet: 26,
        Lotus: 22.5,
        CompetitorAvg: 23.8,
      },
      {
        month: "มี.ค.",
        Tops: 22,
        BigC: 23,
        Gourmet: 26,
        Lotus: 22.5,
        CompetitorAvg: 23.8,
      },
      {
        month: "เม.ย.",
        Tops: 22,
        BigC: 23,
        Gourmet: 26,
        Lotus: 22.5,
        CompetitorAvg: 23.8,
      },
    ],
  },
  {
    Item: "8851123999123",
    PRODUCT_Thai_DESC: "น้ำผลไม้รวมมาลี 200ml",
    Selling_Price: 18,
    Predicted_Price_XGBoost: 19,
    Predicted_Price_DQN: 17,
    xgboostDiff: 1,
    dqnDiff: -1,
    category: "เครื่องดื่ม",
    ROG_Strategy: "Value",
    region: "กรุงเทพฯ",
    profit_margin: 32,
    unitSold: 2100,
    lastUpdated: "12 ชั่วโมงที่แล้ว",
    competitorPrices: {
      Tops: 18,
      BigC: 17,
      Gourmet: 20,
      Lotus: 17.5,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: 1.5,
        date: "7 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 19,
        BigC: 18,
        Gourmet: 21,
        Lotus: 18.5,
        CompetitorAvg: 19.2,
      },
      {
        month: "ม.ค.",
        Tops: 18.5,
        BigC: 17.5,
        Gourmet: 20.5,
        Lotus: 18,
        CompetitorAvg: 18.7,
      },
      {
        month: "ก.พ.",
        Tops: 18.5,
        BigC: 17.5,
        Gourmet: 20,
        Lotus: 18,
        CompetitorAvg: 18.5,
      },
      {
        month: "มี.ค.",
        Tops: 18,
        BigC: 17,
        Gourmet: 20,
        Lotus: 17.5,
        CompetitorAvg: 18.2,
      },
      {
        month: "เม.ย.",
        Tops: 18,
        BigC: 17,
        Gourmet: 20,
        Lotus: 17.5,
        CompetitorAvg: 18.2,
      },
    ],
  },

  // อาหาร - 5 รายการ
  {
    Item: "8855559000123",
    PRODUCT_Thai_DESC: "มาม่าบะหมี่กึ่งสำเร็จรูปรสต้มยำกุ้ง",
    Selling_Price: 7,
    Predicted_Price_XGBoost: 7,
    Predicted_Price_DQN: 6,
    xgboostDiff: 0,
    dqnDiff: -1,
    category: "อาหาร",
    ROG_Strategy: "Value",
    region: "กรุงเทพฯ",
    profit_margin: 25,
    unitSold: 3500,
    lastUpdated: "3 ชั่วโมงที่แล้ว",
    competitorPrices: {
      Tops: 7,
      BigC: 7,
      Gourmet: 8,
      Lotus: 7,
    },
    priceAlerts: [
      {
        competitor: "Lotus",
        change: 0,
        date: "3 ชั่วโมงที่แล้ว",
        action: "ยกเลิกจำหน่าย",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 7,
        BigC: 7,
        Gourmet: 8,
        Lotus: 7,
        CompetitorAvg: 7.3,
      },
      {
        month: "ม.ค.",
        Tops: 7,
        BigC: 7,
        Gourmet: 8,
        Lotus: 7,
        CompetitorAvg: 7.3,
      },
      {
        month: "ก.พ.",
        Tops: 7,
        BigC: 7,
        Gourmet: 8,
        Lotus: 7,
        CompetitorAvg: 7.3,
      },
      {
        month: "มี.ค.",
        Tops: 7,
        BigC: 7,
        Gourmet: 8,
        Lotus: 7,
        CompetitorAvg: 7.3,
      },
      {
        month: "เม.ย.",
        Tops: 7,
        BigC: 7,
        Gourmet: 8,
        Lotus: 7,
        CompetitorAvg: 7.3,
      },
    ],
  },
  {
    Item: "8855559111456",
    PRODUCT_Thai_DESC: "ข้าวหอมมะลิตราฉัตร 5kg",
    Selling_Price: 190,
    Predicted_Price_XGBoost: 195,
    Predicted_Price_DQN: 185,
    xgboostDiff: 5,
    dqnDiff: -5,
    category: "อาหาร",
    ROG_Strategy: "Premium",
    region: "กรุงเทพฯ",
    profit_margin: 40,
    unitSold: 950,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 190,
      BigC: 185,
      Gourmet: 205,
      Lotus: 188,
    },
    priceAlerts: [
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
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 195,
        BigC: 190,
        Gourmet: 210,
        Lotus: 193,
        CompetitorAvg: 197.7,
      },
      {
        month: "ม.ค.",
        Tops: 193,
        BigC: 188,
        Gourmet: 208,
        Lotus: 191,
        CompetitorAvg: 195.7,
      },
      {
        month: "ก.พ.",
        Tops: 192,
        BigC: 187,
        Gourmet: 207,
        Lotus: 190,
        CompetitorAvg: 194.7,
      },
      {
        month: "มี.ค.",
        Tops: 190,
        BigC: 185,
        Gourmet: 205,
        Lotus: 188,
        CompetitorAvg: 192.7,
      },
      {
        month: "เม.ย.",
        Tops: 190,
        BigC: 185,
        Gourmet: 205,
        Lotus: 188,
        CompetitorAvg: 192.7,
      },
    ],
  },
  {
    Item: "8855559222789",
    PRODUCT_Thai_DESC: "ปลากระป๋องสามแม่ครัว",
    Selling_Price: 22,
    Predicted_Price_XGBoost: 24,
    Predicted_Price_DQN: 21,
    xgboostDiff: 2,
    dqnDiff: -1,
    category: "อาหาร",
    ROG_Strategy: "Value",
    region: "กรุงเทพฯ",
    profit_margin: 28,
    unitSold: 2200,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 22,
      BigC: 23,
      Gourmet: 26,
      Lotus: 22.5,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: 3,
        date: "7 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 23,
        BigC: 24,
        Gourmet: 27,
        Lotus: 23.5,
        CompetitorAvg: 24.8,
      },
      {
        month: "ม.ค.",
        Tops: 22.5,
        BigC: 23.5,
        Gourmet: 26.5,
        Lotus: 23,
        CompetitorAvg: 24.3,
      },
      {
        month: "ก.พ.",
        Tops: 22.5,
        BigC: 23,
        Gourmet: 26,
        Lotus: 22.5,
        CompetitorAvg: 23.8,
      },
      {
        month: "มี.ค.",
        Tops: 22,
        BigC: 23,
        Gourmet: 26,
        Lotus: 22.5,
        CompetitorAvg: 23.8,
      },
      {
        month: "เม.ย.",
        Tops: 22,
        BigC: 23,
        Gourmet: 26,
        Lotus: 22.5,
        CompetitorAvg: 23.8,
      },
    ],
  },
  {
    Item: "8855559333111",
    PRODUCT_Thai_DESC: "น้ำมันพืชมรกต 1L",
    Selling_Price: 65,
    Predicted_Price_XGBoost: 68,
    Predicted_Price_DQN: 63,
    xgboostDiff: 3,
    dqnDiff: -2,
    category: "อาหาร",
    ROG_Strategy: "Standard",
    region: "กรุงเทพฯ",
    profit_margin: 30,
    unitSold: 1450,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 65,
      BigC: 64,
      Gourmet: 70,
      Lotus: 65,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: 3,
        date: "8 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 64,
        BigC: 63,
        Gourmet: 69,
        Lotus: 64,
        CompetitorAvg: 65.3,
      },
      {
        month: "ม.ค.",
        Tops: 64,
        BigC: 63,
        Gourmet: 69,
        Lotus: 64,
        CompetitorAvg: 65.3,
      },
      {
        month: "ก.พ.",
        Tops: 64.5,
        BigC: 63.5,
        Gourmet: 69.5,
        Lotus: 64.5,
        CompetitorAvg: 65.8,
      },
      {
        month: "มี.ค.",
        Tops: 65,
        BigC: 64,
        Gourmet: 70,
        Lotus: 65,
        CompetitorAvg: 66.3,
      },
      {
        month: "เม.ย.",
        Tops: 65,
        BigC: 64,
        Gourmet: 70,
        Lotus: 65,
        CompetitorAvg: 66.3,
      },
    ],
  },
  {
    Item: "8855559444222",
    PRODUCT_Thai_DESC: "ไข่ไก่ Betrago (แผง 10 ฟอง)",
    Selling_Price: 40,
    Predicted_Price_XGBoost: 42,
    Predicted_Price_DQN: 38,
    xgboostDiff: 2,
    dqnDiff: -2,
    category: "อาหาร",
    ROG_Strategy: "Value",
    region: "กรุงเทพฯ",
    profit_margin: 25,
    unitSold: 2350,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 40,
      BigC: 41,
      Gourmet: 46,
      Lotus: 41,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: 3,
        date: "9 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 41,
        BigC: 42,
        Gourmet: 47,
        Lotus: 42,
        CompetitorAvg: 43.7,
      },
      {
        month: "ม.ค.",
        Tops: 40.5,
        BigC: 41.5,
        Gourmet: 46.5,
        Lotus: 41.5,
        CompetitorAvg: 43.2,
      },
      {
        month: "ก.พ.",
        Tops: 40.5,
        BigC: 41.5,
        Gourmet: 46,
        Lotus: 41,
        CompetitorAvg: 42.8,
      },
      {
        month: "มี.ค.",
        Tops: 40,
        BigC: 41,
        Gourmet: 46,
        Lotus: 41,
        CompetitorAvg: 42.7,
      },
      {
        month: "เม.ย.",
        Tops: 40,
        BigC: 41,
        Gourmet: 46,
        Lotus: 41,
        CompetitorAvg: 42.7,
      },
    ],
  },

  // ขนม - 5 รายการ
  {
    Item: "8857771000123",
    PRODUCT_Thai_DESC: "เลย์มันฝรั่งทอดกรอบรสดั้งเดิม",
    Selling_Price: 30,
    Predicted_Price_XGBoost: 32,
    Predicted_Price_DQN: 29,
    xgboostDiff: 2,
    dqnDiff: -1,
    category: "ขนม",
    ROG_Strategy: "Standard",
    region: "กรุงเทพฯ",
    profit_margin: 35,
    unitSold: 1900,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 30,
      BigC: 29,
      Gourmet: 34,
      Lotus: 30,
    },
    priceAlerts: [
      {
        competitor: "Big C",
        change: -2,
        date: "11 เม.ย. 2025",
        action: "ลดราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 31,
        BigC: 30,
        Gourmet: 35,
        Lotus: 31,
        CompetitorAvg: 32,
      },
      {
        month: "ม.ค.",
        Tops: 30.5,
        BigC: 29.5,
        Gourmet: 34.5,
        Lotus: 30.5,
        CompetitorAvg: 31.5,
      },
      {
        month: "ก.พ.",
        Tops: 30.5,
        BigC: 29,
        Gourmet: 34,
        Lotus: 30,
        CompetitorAvg: 31,
      },
      {
        month: "มี.ค.",
        Tops: 30,
        BigC: 29,
        Gourmet: 34,
        Lotus: 30,
        CompetitorAvg: 31,
      },
      {
        month: "เม.ย.",
        Tops: 30,
        BigC: 29,
        Gourmet: 34,
        Lotus: 30,
        CompetitorAvg: 31,
      },
    ],
  },
  {
    Item: "8857771111456",
    PRODUCT_Thai_DESC: "Oreo คุกกี้ช็อคโกแลต",
    Selling_Price: 50,
    Predicted_Price_XGBoost: 53,
    Predicted_Price_DQN: 48,
    xgboostDiff: 3,
    dqnDiff: -2,
    category: "ขนม",
    ROG_Strategy: "Premium",
    region: "กรุงเทพฯ",
    profit_margin: 40,
    unitSold: 1250,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 50,
      BigC: 52,
      Gourmet: 58,
      Lotus: 51,
    },
    priceAlerts: [
      {
        competitor: "Lotus",
        change: 0,
        date: "3 เม.ย. 2025",
        action: "ยกเลิกจำหน่าย",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 51,
        BigC: 53,
        Gourmet: 59,
        Lotus: 52,
        CompetitorAvg: 54.7,
      },
      {
        month: "ม.ค.",
        Tops: 50.5,
        BigC: 52.5,
        Gourmet: 58.5,
        Lotus: 51.5,
        CompetitorAvg: 54.2,
      },
      {
        month: "ก.พ.",
        Tops: 50.5,
        BigC: 52,
        Gourmet: 58,
        Lotus: 51,
        CompetitorAvg: 53.7,
      },
      {
        month: "มี.ค.",
        Tops: 50,
        BigC: 52,
        Gourmet: 58,
        Lotus: 51,
        CompetitorAvg: 53.7,
      },
      {
        month: "เม.ย.",
        Tops: 50,
        BigC: 52,
        Gourmet: 58,
        Lotus: 51,
        CompetitorAvg: 53.7,
      },
    ],
  },
  {
    Item: "8857771222789",
    PRODUCT_Thai_DESC: "ขนมปังแซนวิช",
    Selling_Price: 35,
    Predicted_Price_XGBoost: 37,
    Predicted_Price_DQN: 34,
    xgboostDiff: 2,
    dqnDiff: -1,
    category: "ขนม",
    ROG_Strategy: "Standard",
    region: "กรุงเทพฯ",
    profit_margin: 35,
    unitSold: 2050,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 35,
      BigC: 34,
      Gourmet: 39,
      Lotus: 35,
    },
    priceAlerts: [
      {
        competitor: "Lotus",
        change: -1,
        date: "6 เม.ย. 2025",
        action: "ลดราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 36,
        BigC: 35,
        Gourmet: 40,
        Lotus: 36,
        CompetitorAvg: 37,
      },
      {
        month: "ม.ค.",
        Tops: 35.5,
        BigC: 34.5,
        Gourmet: 39.5,
        Lotus: 35.5,
        CompetitorAvg: 36.5,
      },
      {
        month: "ก.พ.",
        Tops: 35.5,
        BigC: 34,
        Gourmet: 39,
        Lotus: 35,
        CompetitorAvg: 36,
      },
      {
        month: "มี.ค.",
        Tops: 35,
        BigC: 34,
        Gourmet: 39,
        Lotus: 35,
        CompetitorAvg: 36,
      },
      {
        month: "เม.ย.",
        Tops: 35,
        BigC: 34,
        Gourmet: 39,
        Lotus: 35,
        CompetitorAvg: 36,
      },
    ],
  },
  {
    Item: "8857771333111",
    PRODUCT_Thai_DESC: "ทวินเวเฟอร์รสช็อคโกแลต",
    Selling_Price: 25,
    Predicted_Price_XGBoost: 27,
    Predicted_Price_DQN: 24,
    xgboostDiff: 2,
    dqnDiff: -1,
    category: "ขนม",
    ROG_Strategy: "Value",
    region: "กรุงเทพฯ",
    profit_margin: 32,
    unitSold: 2300,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 25,
      BigC: 26,
      Gourmet: 29,
      Lotus: 25.5,
    },
    priceAlerts: [
      {
        competitor: "Big C",
        change: -1,
        date: "5 เม.ย. 2025",
        action: "ลดราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 26,
        BigC: 27,
        Gourmet: 30,
        Lotus: 26.5,
        CompetitorAvg: 27.8,
      },
      {
        month: "ม.ค.",
        Tops: 25.5,
        BigC: 26.5,
        Gourmet: 29.5,
        Lotus: 26,
        CompetitorAvg: 27.3,
      },
      {
        month: "ก.พ.",
        Tops: 25.5,
        BigC: 26,
        Gourmet: 29,
        Lotus: 25.5,
        CompetitorAvg: 26.8,
      },
      {
        month: "มี.ค.",
        Tops: 25,
        BigC: 26,
        Gourmet: 29,
        Lotus: 25.5,
        CompetitorAvg: 26.8,
      },
      {
        month: "เม.ย.",
        Tops: 25,
        BigC: 26,
        Gourmet: 29,
        Lotus: 25.5,
        CompetitorAvg: 26.8,
      },
    ],
  },
  {
    Item: "8857771444222",
    PRODUCT_Thai_DESC: "ขนมเค้กไข่ตราหมี",
    Selling_Price: 40,
    Predicted_Price_XGBoost: 42,
    Predicted_Price_DQN: 39,
    xgboostDiff: 2,
    dqnDiff: -1,
    category: "ขนม",
    ROG_Strategy: "Standard",
    region: "กรุงเทพฯ",
    profit_margin: 35,
    unitSold: 1850,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 40,
      BigC: 41,
      Gourmet: 45,
      Lotus: 40,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: 2,
        date: "4 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 41,
        BigC: 42,
        Gourmet: 46,
        Lotus: 41,
        CompetitorAvg: 43,
      },
      {
        month: "ม.ค.",
        Tops: 40.5,
        BigC: 41.5,
        Gourmet: 45.5,
        Lotus: 40.5,
        CompetitorAvg: 42.5,
      },
      {
        month: "ก.พ.",
        Tops: 40.5,
        BigC: 41,
        Gourmet: 45,
        Lotus: 40,
        CompetitorAvg: 42,
      },
      {
        month: "มี.ค.",
        Tops: 40,
        BigC: 41,
        Gourmet: 45,
        Lotus: 40,
        CompetitorAvg: 42,
      },
      {
        month: "เม.ย.",
        Tops: 40,
        BigC: 41,
        Gourmet: 45,
        Lotus: 40,
        CompetitorAvg: 42,
      },
    ],
  },

  // ของใช้ - 5 รายการ
  {
    Item: "8859993000123",
    PRODUCT_Thai_DESC: "น้ำยาล้างจานซันไลท์ 500ml",
    Selling_Price: 45,
    Predicted_Price_XGBoost: 47,
    Predicted_Price_DQN: 43,
    xgboostDiff: 2,
    dqnDiff: -2,
    category: "ของใช้",
    ROG_Strategy: "Value",
    region: "กรุงเทพฯ",
    profit_margin: 28,
    unitSold: 1650,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 45,
      BigC: 44,
      Gourmet: 50,
      Lotus: 45,
    },
    priceAlerts: [
      {
        competitor: "Tops",
        change: 4,
        date: "13 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 44,
        BigC: 43,
        Gourmet: 49,
        Lotus: 44,
        CompetitorAvg: 45.3,
      },
      {
        month: "ม.ค.",
        Tops: 44,
        BigC: 43,
        Gourmet: 49,
        Lotus: 44,
        CompetitorAvg: 45.3,
      },
      {
        month: "ก.พ.",
        Tops: 44.5,
        BigC: 43.5,
        Gourmet: 49.5,
        Lotus: 44.5,
        CompetitorAvg: 45.8,
      },
      {
        month: "มี.ค.",
        Tops: 45,
        BigC: 44,
        Gourmet: 50,
        Lotus: 45,
        CompetitorAvg: 46.3,
      },
      {
        month: "เม.ย.",
        Tops: 45,
        BigC: 44,
        Gourmet: 50,
        Lotus: 45,
        CompetitorAvg: 46.3,
      },
    ],
  },
  {
    Item: "8859993111456",
    PRODUCT_Thai_DESC: "บรีซผงซักฟอก 1kg",
    Selling_Price: 80,
    Predicted_Price_XGBoost: 83,
    Predicted_Price_DQN: 78,
    xgboostDiff: 3,
    dqnDiff: -2,
    category: "ของใช้",
    ROG_Strategy: "Standard",
    region: "กรุงเทพฯ",
    profit_margin: 30,
    unitSold: 1250,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 80,
      BigC: 78,
      Gourmet: 85,
      Lotus: 79,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: -3,
        date: "8 เม.ย. 2025",
        action: "ลดราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 79,
        BigC: 77,
        Gourmet: 84,
        Lotus: 78,
        CompetitorAvg: 79.7,
      },
      {
        month: "ม.ค.",
        Tops: 79,
        BigC: 77,
        Gourmet: 84,
        Lotus: 78,
        CompetitorAvg: 79.7,
      },
      {
        month: "ก.พ.",
        Tops: 79.5,
        BigC: 77.5,
        Gourmet: 84.5,
        Lotus: 78.5,
        CompetitorAvg: 80.2,
      },
      {
        month: "มี.ค.",
        Tops: 80,
        BigC: 78,
        Gourmet: 85,
        Lotus: 79,
        CompetitorAvg: 80.7,
      },
      {
        month: "เม.ย.",
        Tops: 80,
        BigC: 78,
        Gourmet: 85,
        Lotus: 79,
        CompetitorAvg: 80.7,
      },
    ],
  },
  {
    Item: "8859993222789",
    PRODUCT_Thai_DESC: "สก็อตกระดาษชำระ 6 ม้วน",
    Selling_Price: 90,
    Predicted_Price_XGBoost: 93,
    Predicted_Price_DQN: 88,
    xgboostDiff: 3,
    dqnDiff: -2,
    category: "ของใช้",
    ROG_Strategy: "Standard",
    region: "กรุงเทพฯ",
    profit_margin: 30,
    unitSold: 1450,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 90,
      BigC: 88,
      Gourmet: 95,
      Lotus: 89,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: 4,
        date: "7 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 89,
        BigC: 87,
        Gourmet: 94,
        Lotus: 88,
        CompetitorAvg: 89.7,
      },
      {
        month: "ม.ค.",
        Tops: 89,
        BigC: 87,
        Gourmet: 94,
        Lotus: 88,
        CompetitorAvg: 89.7,
      },
      {
        month: "ก.พ.",
        Tops: 89.5,
        BigC: 87.5,
        Gourmet: 94.5,
        Lotus: 88.5,
        CompetitorAvg: 90.2,
      },
      {
        month: "มี.ค.",
        Tops: 90,
        BigC: 88,
        Gourmet: 95,
        Lotus: 89,
        CompetitorAvg: 90.7,
      },
      {
        month: "เม.ย.",
        Tops: 90,
        BigC: 88,
        Gourmet: 95,
        Lotus: 89,
        CompetitorAvg: 90.7,
      },
    ],
  },
  {
    Item: "8859993333111",
    PRODUCT_Thai_DESC: "สบู่อาบน้ำ",
    Selling_Price: 35,
    Predicted_Price_XGBoost: 37,
    Predicted_Price_DQN: 34,
    xgboostDiff: 2,
    dqnDiff: -1,
    category: "ของใช้",
    ROG_Strategy: "Value",
    region: "กรุงเทพฯ",
    profit_margin: 28,
    unitSold: 1950,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 35,
      BigC: 36,
      Gourmet: 40,
      Lotus: 35.5,
    },
    priceAlerts: [
      {
        competitor: "Tops",
        change: -2,
        date: "10 เม.ย. 2025",
        action: "ลดราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 36,
        BigC: 37,
        Gourmet: 41,
        Lotus: 36.5,
        CompetitorAvg: 38.2,
      },
      {
        month: "ม.ค.",
        Tops: 35.5,
        BigC: 36.5,
        Gourmet: 40.5,
        Lotus: 36,
        CompetitorAvg: 37.7,
      },
      {
        month: "ก.พ.",
        Tops: 35.5,
        BigC: 36,
        Gourmet: 40,
        Lotus: 35.5,
        CompetitorAvg: 37.2,
      },
      {
        month: "มี.ค.",
        Tops: 35,
        BigC: 36,
        Gourmet: 40,
        Lotus: 35.5,
        CompetitorAvg: 37.2,
      },
      {
        month: "เม.ย.",
        Tops: 35,
        BigC: 36,
        Gourmet: 40,
        Lotus: 35.5,
        CompetitorAvg: 37.2,
      },
    ],
  },
  {
    Item: "8859993444222",
    PRODUCT_Thai_DESC: "แปรงสีฟัน",
    Selling_Price: 25,
    Predicted_Price_XGBoost: 27,
    Predicted_Price_DQN: 24,
    xgboostDiff: 2,
    dqnDiff: -1,
    category: "ของใช้",
    ROG_Strategy: "Value",
    region: "กรุงเทพฯ",
    profit_margin: 28,
    unitSold: 2050,
    lastUpdated: "14 เม.ย. 2025",
    competitorPrices: {
      Tops: 25,
      BigC: 26,
      Gourmet: 29,
      Lotus: 25.5,
    },
    priceAlerts: [
      {
        competitor: "Gourmet",
        change: 2,
        date: "5 เม.ย. 2025",
        action: "เพิ่มราคา",
      },
    ],
    priceHistory: [
      {
        month: "ธ.ค.",
        Tops: 26,
        BigC: 27,
        Gourmet: 30,
        Lotus: 26.5,
        CompetitorAvg: 27.8,
      },
      {
        month: "ม.ค.",
        Tops: 25.5,
        BigC: 26.5,
        Gourmet: 29.5,
        Lotus: 26,
        CompetitorAvg: 27.3,
      },
      {
        month: "ก.พ.",
        Tops: 25.5,
        BigC: 26,
        Gourmet: 29,
        Lotus: 25.5,
        CompetitorAvg: 26.8,
      },
      {
        month: "มี.ค.",
        Tops: 25,
        BigC: 26,
        Gourmet: 29,
        Lotus: 25.5,
        CompetitorAvg: 26.8,
      },
      {
        month: "เม.ย.",
        Tops: 25,
        BigC: 26,
        Gourmet: 29,
        Lotus: 25.5,
        CompetitorAvg: 26.8,
      },
    ],
  },
];

// ฟังก์ชันสำหรับแปลงข้อมูลเพื่อใช้ในหน้า VisualizationPage
export const getCompetitorComparisonData = () => {
  return productData.map((item) => ({
    name: item.PRODUCT_Thai_DESC,
    Tops: item.competitorPrices.Tops,
    BigC: item.competitorPrices.BigC,
    Gourmet: item.competitorPrices.Gourmet,
    Lotus: item.competitorPrices.Lotus,
    category: item.category,
    barcode: item.Item,
  }));
};

// ฟังก์ชันสำหรับดึงข้อมูลแนวโน้มราคาสำหรับหน้า VisualizationPage
export const getPriceHistoryData = (itemBarcode = null) => {
  if (itemBarcode) {
    const item = productData.find((product) => product.Item === itemBarcode);
    if (!item) {
      return getDefaultPriceHistory();
    }
    const monthMapping = {
      "ธ.ค.": "Dec-24",
      "ม.ค.": "Jan-25",
      "ก.พ.": "Feb-25",
      "มี.ค.": "Mar-25",
      "เม.ย.": "Apr-25*",
    };
    return item.priceHistory.map((history) => ({
      month: monthMapping[history.month] || history.month,
      Tops: history.Tops,
      BigC: history.BigC,
      Gourmet: history.Gourmet,
      Lotus: history.Lotus,
      CompetitorAvg: history.CompetitorAvg,
    }));
  }
  return getDefaultPriceHistory();
};

// ฟังก์ชันสำหรับข้อมูลภาพรวม
const getDefaultPriceHistory = () => {
  return [
    {
      month: "Oct-24",
      Tops: 14.8,
      BigC: 15.2,
      Gourmet: 16.2,
      Lotus: 14.5,
      CompetitorAvg: 15.3,
    },
    {
      month: "Nov-24",
      Tops: 14.5,
      BigC: 15.0,
      Gourmet: 16.5,
      Lotus: 14.3,
      CompetitorAvg: 15.27,
    },
    {
      month: "Dec-24",
      Tops: 14.5,
      BigC: 14.8,
      Gourmet: 16.2,
      Lotus: 14.0,
      CompetitorAvg: 15.0,
    },
    {
      month: "Jan-25",
      Tops: 14.3,
      BigC: 15.2,
      Gourmet: 16.0,
      Lotus: 14.0,
      CompetitorAvg: 15.07,
    },
    {
      month: "Feb-25",
      Tops: 14.0,
      BigC: 15.0,
      Gourmet: 16.0,
      Lotus: 14.0,
      CompetitorAvg: 15.0,
    },
    {
      month: "Mar-25",
      Tops: 14.0,
      BigC: 15.0,
      Gourmet: 16.0,
      Lotus: 14.0,
      CompetitorAvg: 15.0,
    },
    {
      month: "Apr-25*",
      Tops: 13.8,
      BigC: 14.8,
      Gourmet: 15.8,
      Lotus: 13.8,
      CompetitorAvg: 14.8,
    },
  ];
};

// ฟังก์ชันสำหรับดึงข้อมูลเปรียบเทียบราคาสำหรับหน้า DetailPage
export const getPriceComparisonData = () => {
  const result = {};
  productData.forEach((item) => {
    result[item.Item] = item.priceHistory;
  });
  return result;
};

// ฟังก์ชันสำหรับคำนวณสินค้าที่ควรปรับราคา
export const getItemsToAdjust = () => {
  return productData.filter((item) => item.xgboostDiff !== 0);
};

// ฟังก์ชันสำหรับดึงข้อมูลการแจ้งเตือนราคาล่าสุด
export const getNotificationsData = () => {
  const notifications = [];
  productData.forEach((item) => {
    item.priceAlerts.forEach((alert) => {
      notifications.push({
        title: `${alert.competitor} - ${item.PRODUCT_Thai_DESC}`,
        message:
          alert.action === "ยกเลิกจำหน่าย"
            ? "ยกเลิกจำหน่ายสินค้า"
            : `ราคา${
                alert.action === "ลดราคา" ? "ลดลง" : "เพิ่มขึ้น"
              } ${Math.abs(alert.change)} บาท`,
        time: alert.date,
        read: false,
        barcode: item.Item,
      });
    });
  });
  return notifications.sort((a, b) => {
    const dateA = new Date(
      a.time.replace("เม.ย.", "Apr").replace("มี.ค.", "Mar")
    );
    const dateB = new Date(
      b.time.replace("เม.ย.", "Apr").replace("มี.ค.", "Mar")
    );
    return dateB - dateA;
  });
};

// Helper function to round to nearest integer, .5, or .25
const roundToNearestValid = (value) => {
  const scaled = value * 4;
  const rounded = Math.round(scaled);
  return rounded / 4;
};

// ฟังก์ชันสร้างข้อมูล WeeklyPriceHistory
export const getWeeklyPriceHistory = (itemBarcode) => {
  const item = productData.find((product) => product.Item === itemBarcode);
  if (!item) return [];

  const currentWeek = new Date(2025, 3, 15);
  currentWeek.setHours(0, 0, 0, 0);

  const weeklyData = [];
  const priceHistory = item.priceHistory;
  const months = ["ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย."];
  const monthToIndex = months.reduce((acc, m, i) => ({ ...acc, [m]: i }), {});

  const sortedHistory = priceHistory.sort(
    (a, b) => monthToIndex[a.month] - monthToIndex[b.month]
  );

  const weeksPerMonth = 12 / 3;
  const endPrices = {
    Tops: item.competitorPrices.Tops,
    BigC: item.competitorPrices.BigC,
    Gourmet: item.competitorPrices.Gourmet,
    Lotus: item.competitorPrices.Lotus,
    CompetitorAvg:
      (item.competitorPrices.BigC +
        item.competitorPrices.Gourmet +
        item.competitorPrices.Lotus) /
      3,
  };

  const relevantMonths = sortedHistory.slice(-3);
  const monthlyPrices = relevantMonths.map((month, index) => ({
    monthIndex: 2 + index,
    Tops: month.Tops,
    BigC: month.BigC,
    Gourmet: month.Gourmet,
    Lotus: month.Lotus,
    CompetitorAvg: month.CompetitorAvg,
  }));

  const competitorPricePattern = [
    1.02, 1.01, 1.0, 0.99, 0.98, 0.97, 0.97, 0.98, 0.99, 1.0, 1.01, 1.02,
  ];

  for (let i = 0; i < 12; i++) {
    const weekDate = new Date(currentWeek);
    weekDate.setDate(weekDate.getDate() - (11 - i) * 7);
    const formattedDate = `${weekDate.getDate().toString().padStart(2, "0")}/${(
      weekDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${weekDate.getFullYear().toString().slice(2)}`;

    const weekProgress = i / 11;
    const monthProgress = weekProgress * 2 + 2;

    let topsPrice, bigCPrice, gourmetPrice, lotusPrice, competitorAvgPrice;

    if (monthProgress <= 3) {
      const t = monthProgress - 2;
      topsPrice =
        monthlyPrices[0].Tops +
        t * (monthlyPrices[1].Tops - monthlyPrices[0].Tops);
      bigCPrice =
        monthlyPrices[0].BigC +
        t * (monthlyPrices[1].BigC - monthlyPrices[0].BigC);
      gourmetPrice =
        monthlyPrices[0].Gourmet +
        t * (monthlyPrices[1].Gourmet - monthlyPrices[0].Gourmet);
      lotusPrice =
        monthlyPrices[0].Lotus +
        t * (monthlyPrices[1].Lotus - monthlyPrices[0].Lotus);
      competitorAvgPrice =
        monthlyPrices[0].CompetitorAvg +
        t * (monthlyPrices[1].CompetitorAvg - monthlyPrices[0].CompetitorAvg);
    } else {
      const t = monthProgress - 3;
      topsPrice =
        monthlyPrices[1].Tops +
        t * (monthlyPrices[2].Tops - monthlyPrices[1].Tops);
      bigCPrice =
        monthlyPrices[1].BigC +
        t * (monthlyPrices[2].BigC - monthlyPrices[1].BigC);
      gourmetPrice =
        monthlyPrices[1].Gourmet +
        t * (monthlyPrices[2].Gourmet - monthlyPrices[1].Gourmet);
      lotusPrice =
        monthlyPrices[1].Lotus +
        t * (monthlyPrices[2].Lotus - monthlyPrices[1].Lotus);
      competitorAvgPrice =
        monthlyPrices[1].CompetitorAvg +
        t * (monthlyPrices[2].CompetitorAvg - monthlyPrices[1].CompetitorAvg);
    }

    if (i === 11) {
      topsPrice = endPrices.Tops;
      bigCPrice = endPrices.BigC;
      gourmetPrice = endPrices.Gourmet;
      lotusPrice = endPrices.Lotus;
      competitorAvgPrice = endPrices.CompetitorAvg;
    } else {
      const patternFactor = competitorPricePattern[i];
      bigCPrice *= 1 + (patternFactor - 1) * 0.5;
      gourmetPrice *= 1 + (patternFactor - 1) * 0.8;
      lotusPrice *= 1 + (patternFactor - 1) * 0.3;
    }

    topsPrice = roundToNearestValid(topsPrice);
    bigCPrice = roundToNearestValid(bigCPrice);
    gourmetPrice = roundToNearestValid(gourmetPrice);
    lotusPrice = roundToNearestValid(lotusPrice);
    competitorAvgPrice = roundToNearestValid(competitorAvgPrice);

    weeklyData.push({
      week: `W${i + 1}`,
      date: formattedDate,
      Tops: topsPrice,
      BigC: bigCPrice,
      Gourmet: gourmetPrice,
      Lotus: lotusPrice,
      CompetitorAvg: competitorAvgPrice,
    });
  }

  return weeklyData;
};

export default productData;
