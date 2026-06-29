import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axiosInstance";

import StatCard from "../components/Dashboard/StatCard";
import RecentIssues from "../components/Dashboard/RecentIssues";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/my");
      setDashboard(res.data);
    } catch (error) {
      // console.log("Dashboard error:", error);
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     setLoggingOut(true);

  //     await axiosInstance.post("/auth/logout");

  //     setUser(null);
  //     navigate("/login");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Logout Failed");
  //   } finally {
  //     setLoggingOut(false);
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">
                Dashboard
              </h1>

              <p className="mt-2 sm:mt-3 text-blue-100 text-sm sm:text-base max-w-2xl">
                Track your reported civic issues and monitor progress.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">

              <button
                onClick={() => navigate("/create-issue")}
                className="bg-white text-blue-700 font-semibold px-5 py-3 rounded-xl hover:bg-blue-50 transition w-full sm:w-auto"
              >
                + Report Issue
              </button>
{/* 
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="border border-white/30 text-white px-5 py-3 rounded-xl hover:bg-white/10 transition w-full sm:w-auto"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button> */}

            </div>

          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">

          <StatCard title="Total Issues" value={dashboard?.totalIssues ?? 0} />
          <StatCard title="Pending" value={dashboard?.pendingIssues ?? 0} />
          <StatCard title="Resolved" value={dashboard?.resolvedIssues ?? 0} />
          <StatCard title="High Priority" value={dashboard?.highPriorityIssues ?? 0} />

        </div>

        {/* CHARTS */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-8 sm:mb-10">

          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Analytics
          </h2>

          <div className="w-full overflow-x-auto">
            <DashboardCharts dashboard={dashboard || {}} />
          </div>

        </div>

        {/* RECENT ISSUES */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

            <h2 className="text-xl sm:text-2xl font-bold">
              Recent Issues
            </h2>

            <button
              onClick={() => navigate("/my-issues")}
              className="text-blue-600 hover:underline font-medium text-sm sm:text-base text-left sm:text-right"
            >
              View All →
            </button>

          </div>

          <RecentIssues issues={dashboard?.recentIssues ?? []} />

        </div>

      </div>
    </div>
  );
};

export default Dashboard;