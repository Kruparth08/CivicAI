import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DashboardCharts = ({ dashboard }) => {
  if (!dashboard) return null;

  // SAFE FALLBACKS
  const categoryStats = dashboard.categoryStats || [];
  const departmentStats = dashboard.departmentStats || [];

  // 🎨 COLOR PALETTE
  const colors = [
    "#6366f1",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#a855f7",
  ];

  // CATEGORY PIE
  const pieData = {
    labels: categoryStats.map((item) => item._id || "Other"),
    datasets: [
      {
        data: categoryStats.map((item) => item.count || 0),
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 10,
      },
    ],
  };

  // DEPARTMENT DOUGHNUT
  const departmentData = {
    labels: departmentStats.map((item) => item._id || "Unknown"),
    datasets: [
      {
        data: departmentStats.map((item) => item.count || 0),
        backgroundColor: colors.slice().reverse(),
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 10,
      },
    ],
  };

  // STATUS BAR
  const statusData = {
    labels: ["Pending", "Resolved"],
    datasets: [
      {
        label: "Issues",
        data: [
          dashboard.pendingIssues || 0,
          dashboard.resolvedIssues || 0,
        ],
        backgroundColor: ["#f59e0b", "#10b981"],
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* CATEGORY */}
      <div className="bg-gradient-to-br from-white to-indigo-50 border rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          Category Distribution
        </h2>

        {categoryStats.length > 0 ? (
          <Pie data={pieData} />
        ) : (
          <p className="text-gray-500">No Data Available</p>
        )}
      </div>

      {/* DEPARTMENT */}
      <div className="bg-gradient-to-br from-white to-cyan-50 border rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-4 text-gray-700">
          Department Distribution
        </h2>

        {departmentStats.length > 0 ? (
          <Doughnut data={departmentData} />
        ) : (
          <p className="text-gray-500">No Data Available</p>
        )}
      </div>

      {/* STATUS */}
      <div className="bg-white border rounded-2xl shadow-sm p-5 flex flex-col">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Status Overview
        </h2>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <Bar
              data={statusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
              }}
              height={220}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardCharts;