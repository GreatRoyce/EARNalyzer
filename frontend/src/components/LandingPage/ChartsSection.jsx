// src/components/LandingPage/ChartsSection.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import wood from "../../assets/wood1.png";



function ChartsSection() {
  const MANUSCRIPT_COLORS = {
    parchment: "#2A1B0D",      // Dark brown for text
    agedPaper: "#3D2816",      // Dark coffee for backgrounds
    inkBlack: "#000000",       // Pure black for maximum contrast
    sepia: "#8B4513",         // Rich saddle brown
    goldLeaf: "#C9A227",      // Warm metallic gold
    crimson: "#8B0000",       // Deep red
    forestGreen: "#2E8B57",   // Sea green
    deepBlue: "#000080",      // Navy blue
    burntUmber: "#8B4513",    // Matching sepia
    charcoal: "#2F4F4F",      // Dark slate gray
  };

  // Pie chart data - current allocation
  const pieData = [
    {
      name: "Food & Feasting",
      value: 400,
      percentage: 25,
      displayValue: "25%",
      color: MANUSCRIPT_COLORS.crimson,
    },
    {
      name: "Entertainment",
      value: 300,
      percentage: 18.8,
      displayValue: "18.8%",
      color: MANUSCRIPT_COLORS.deepBlue,
    },
    {
      name: "Transportation",
      value: 200,
      percentage: 12.5,
      displayValue: "12.5%",
      color: MANUSCRIPT_COLORS.forestGreen,
    },
    { 
      name: "Market Wares", 
      value: 150, 
      percentage: 9.4, 
      displayValue: "9.4%",
      color: MANUSCRIPT_COLORS.goldLeaf,
    },
    {
      name: "Remaining Coffers",
      value: 550,
      percentage: 34.3,
      displayValue: "34.3%",
      color: MANUSCRIPT_COLORS.agedPaper,
    },
  ];

  // Bar chart data - projected spending by category over months
  const barData = [
    { 
      month: "Jan", 
      "Food & Feasting": 380, 
      "Entertainment": 280, 
      "Transportation": 190, 
      "Market Wares": 140,
      "Remaining Coffers": 510
    },
    { 
      month: "Feb", 
      "Food & Feasting": 420, 
      "Entertainment": 320, 
      "Transportation": 210, 
      "Market Wares": 160,
      "Remaining Coffers": 490
    },
    { 
      month: "Mar", 
      "Food & Feasting": 350, 
      "Entertainment": 290, 
      "Transportation": 220, 
      "Market Wares": 170,
      "Remaining Coffers": 470
    },
    { 
      month: "Apr", 
      "Food & Feasting": 450, 
      "Entertainment": 310, 
      "Transportation": 180, 
      "Market Wares": 150,
      "Remaining Coffers": 510
    },
    { 
      month: "May", 
      "Food & Feasting": 400, 
      "Entertainment": 300, 
      "Transportation": 200, 
      "Market Wares": 150,
      "Remaining Coffers": 550
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white border-2 border-charcoal p-3 rounded-lg shadow-xl min-w-[200px]"
          style={{ 
            borderColor: MANUSCRIPT_COLORS.charcoal,
            fontFamily: "serif" 
          }}
        >
          <p
            className="font-bold text-inkBlack mb-2 border-b pb-1"
            style={{ color: MANUSCRIPT_COLORS.inkBlack }}
          >
            {label}
          </p>
          {payload.map((entry, index) => (
            <p 
              key={index}
              className="text-sm flex justify-between gap-4"
              style={{ color: entry.color }}
            >
              <span>{entry.name}:</span>
              <span className="font-semibold">{entry.value} gold</span>
            </p>
          ))}
          <p className="text-xs mt-2 pt-1 border-t opacity-75">
            Total: {payload.reduce((sum, entry) => sum + entry.value, 0)} gold
          </p>
        </div>
      );
    }
    return null;
  };

  const PieCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="bg-white border-2 border-charcoal p-3 rounded-lg shadow-xl"
          style={{ 
            borderColor: MANUSCRIPT_COLORS.charcoal,
            fontFamily: "serif" 
          }}
        >
          <p
            className="font-bold text-inkBlack mb-1"
            style={{ color: MANUSCRIPT_COLORS.inkBlack }}
          >
            {data.name}
          </p>
          <p className="text-sm" style={{ color: MANUSCRIPT_COLORS.forestGreen }}>
            Amount: {data.value} gold
          </p>
          <p className="text-sm" style={{ color: MANUSCRIPT_COLORS.deepBlue }}>
            Percentage: {data.percentage.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percentage,
  }) => {
    if (percentage < 5) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill={MANUSCRIPT_COLORS.inkBlack}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
        style={{ fontFamily: "serif" }}
      >
        {`${percentage.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <section
      className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-white"
      style={{ fontFamily: "serif" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div
            className="bg-white border-1 border-crimson rounded-xl p-4 sm:p-6 lg:p-8 inline-block mx-auto max-w-2xl bg-fill bg-no-repeat bg-center"
            style={{
              borderColor: MANUSCRIPT_COLORS.crimson,
              boxShadow: "4px 4px 0px rgba(139, 0, 0, 0.15)",
               backgroundImage: `url(${wood})`
            }}
          >
            <h2
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 "
              style={{ color: MANUSCRIPT_COLORS.inkBlack}}
            >
              Treasury Insights & Projections
            </h2>
            <p
              className="text-sm sm:text-base lg:text-lg opacity-90 text-white"
              
            >
              Current allocation and future spending trends by category
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          
          {/* Pie Chart Card - Current Allocation */}
          <div
            className="bg-white border p-4 sm:p-5 lg:p-6 w-full"
            style={{
              borderColor: MANUSCRIPT_COLORS.crimson,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h3
              className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 text-center"
              style={{ color: MANUSCRIPT_COLORS.inkBlack }}
            >
              Current Treasury Allocation
            </h3>
            <p className="text-xs sm:text-sm text-center mb-3 opacity-75" style={{ color: MANUSCRIPT_COLORS.sepia }}>
              Total: 1,600 gold pieces
            </p>
            <div className="w-full h-64 sm:h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieCustomTooltip />} />
                  <Legend
                    wrapperStyle={{ 
                      fontSize: '11px',
                      fontFamily: "serif",
                      marginTop: '10px'
                    }}
                    formatter={(value) => {
                      const data = pieData.find((item) => item.name === value);
                      return (
                        <span style={{ color: MANUSCRIPT_COLORS.sepia }}>
                          {value}
                        </span>
                      );
                    }}
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart Card - Projected Spending */}
          <div
            className="bg-white border p-4 sm:p-5 lg:p-6 w-full"
            style={{
              borderColor: MANUSCRIPT_COLORS.deepBlue,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h3
              className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 text-center"
              style={{ color: MANUSCRIPT_COLORS.inkBlack }}
            >
              Projected Monthly Spending
            </h3>
            <p className="text-xs sm:text-sm text-center mb-3 opacity-75" style={{ color: MANUSCRIPT_COLORS.sepia }}>
              Category trends over next harvest season
            </p>
            <div className="w-full h-64 sm:h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={barData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={MANUSCRIPT_COLORS.charcoal}
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={MANUSCRIPT_COLORS.sepia}
                    fontSize={10}
                    style={{ fontFamily: "serif" }}
                    tickMargin={10}
                  />
                  <YAxis
                    stroke={MANUSCRIPT_COLORS.sepia}
                    fontSize={10}
                    tickFormatter={(value) => `${value}`}
                    style={{ fontFamily: "serif" }}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ 
                      fontSize: '11px',
                      fontFamily: "serif",
                      marginTop: '10px'
                    }}
                  />
                  {/* Bars for each category using the same colors as pie chart */}
                  <Bar
                    dataKey="Food & Feasting"
                    fill={MANUSCRIPT_COLORS.crimson}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="Entertainment"
                    fill={MANUSCRIPT_COLORS.deepBlue}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="Transportation"
                    fill={MANUSCRIPT_COLORS.forestGreen}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="Market Wares"
                    fill={MANUSCRIPT_COLORS.goldLeaf}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="Remaining Coffers"
                    fill={MANUSCRIPT_COLORS.agedPaper}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insight Summary */}
        <div className="mt-8 sm:mt-10 text-center max-w-2xl mx-auto">
          <div 
            className="bg-white border border-goldLeaf rounded-lg p-4 sm:p-6"
            style={{ borderColor: MANUSCRIPT_COLORS.goldLeaf }}
          >
            <h4 
              className="text-sm sm:text-base font-semibold mb-2"
              style={{ color: MANUSCRIPT_COLORS.inkBlack }}
            >
              📜 Scribe's Insight
            </h4>
            <p 
              className="text-xs sm:text-sm opacity-90"
              style={{ color: MANUSCRIPT_COLORS.sepia }}
            >
              Your feasting expenses show seasonal variation, while market wares remain steady. 
              Consider allocating more to your coffers during abundant months.
            </p>
          </div>
        </div>

        {/* Mobile Optimization Note */}
        <div className="mt-6 sm:mt-8 text-center">
          <p 
            className="text-xs sm:text-sm opacity-75"
            style={{ color: MANUSCRIPT_COLORS.sepia }}
          >
            💡 Tip: Tap on chart elements for detailed insights
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChartsSection;