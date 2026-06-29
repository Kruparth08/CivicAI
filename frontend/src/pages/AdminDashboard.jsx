import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [stats, setStats] = useState(null);
  const [issues, setIssues] = useState([]);

  const [filter, setFilter] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchIssues();
  }, []);

  const fetchStats = async () => {
  try {
    const res = await axiosInstance.get("/dashboard/admin");
    setStats(res.data);
  } catch (error) {
    setStats(null);
  }
};

  const fetchIssues = async (customFilter = filter) => {
    try {
      const query = new URLSearchParams(customFilter).toString();

      const res = await axiosInstance.get(
        `/issues/admin/all?${query}`
      );

      setIssues(res.data);

    } catch (error) {
      setIssues([]);
    }
  };

  const handleChange = (e) => {
    const updated = {
      ...filter,
      [e.target.name]: e.target.value,
    };

    setFilter(updated);
    fetchIssues(updated);
  };

  const updateStatus = async (id, status) => {
    try {

      await axiosInstance.patch(
        `/issues/${id}/status`,
        { status }
      );

      await fetchIssues();
      await fetchStats();

    } catch (error) {
      // console.log(error);
      alert("Failed to update status");
    }
  };

  const handleLogout = async () => {
    try {

      setLoggingOut(true);

      await axiosInstance.post("/auth/logout");

      setUser(null);

      navigate("/login");

    } catch (error) {
      // console.log(error);
      alert(error.response?.data?.message || "Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Resolved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Emergency":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="mt-6 text-2xl font-bold text-gray-700">
            Loading Admin Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl">

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>

            <h1 className="text-4xl lg:text-5xl font-extrabold">
              CivicAI Admin Dashboard
            </h1>

            <p className="text-blue-100 mt-3 text-lg max-w-2xl">
              Manage reports, monitor civic issues, assign departments,
              update priorities and oversee the city's operations from
              one centralized dashboard.
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/admin/issues")}
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              📋 Manage Issues
            </button>

            <button
              onClick={() => navigate("/leaderboard")}
              className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              🏆 Leaderboard
            </button>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-600 transition"
            >
              {loggingOut ? "Logging Out..." : "Logout"}
            </button>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-5 py-8">

        {/* STATS CARDS */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

  <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition hover:-translate-y-1">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 font-medium">
          Total Issues
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {stats.totalIssues}
        </h2>
      </div>

      <div className="text-5xl">
        📋
      </div>
    </div>
  </div>

  <div className="bg-yellow-50 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition hover:-translate-y-1">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-yellow-700 font-medium">
          Pending
        </p>

        <h2 className="text-4xl font-bold text-yellow-600 mt-2">
          {stats.pendingIssues}
        </h2>

      </div>

      <div className="text-5xl">
        ⏳
      </div>

    </div>

  </div>

  <div className="bg-green-50 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition hover:-translate-y-1">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-green-700 font-medium">
          Resolved
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
          {stats.resolvedIssues}
        </h2>

      </div>

      <div className="text-5xl">
        ✅
      </div>

    </div>

  </div>

  <div className="bg-red-50 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition hover:-translate-y-1">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-red-700 font-medium">
          High Priority
        </p>

        <h2 className="text-4xl font-bold text-red-600 mt-2">
          {stats.highPriorityIssues}
        </h2>

      </div>

      <div className="text-5xl">
        🚨
      </div>

    </div>

  </div>

</div>

{/* FILTERS */}

<div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <input
      name="search"
      value={filter.search}
      onChange={handleChange}
      placeholder="🔍 Search issue..."
      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <select
      name="status"
      value={filter.status}
      onChange={handleChange}
      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Status</option>
      <option>Pending</option>
      <option>In Progress</option>
      <option>Resolved</option>
      <option>Rejected</option>
    </select>

    <select
      name="priority"
      value={filter.priority}
      onChange={handleChange}
      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Priority</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
      <option>Emergency</option>
    </select>

  </div>

</div>

      {/* ISSUES TABLE */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">

        <div className="px-6 py-5 border-b bg-gradient-to-r from-slate-50 to-blue-50">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Issues
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Click any issue to view complete details.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr className="text-gray-700">

                <th className="px-6 py-4 text-left">
                  Issue
                </th>

                <th className="px-6 py-4 text-left">
                  Reporter
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Priority
                </th>

                <th className="px-6 py-4 text-center">
                  Update
                </th>

              </tr>

            </thead>

            <tbody>

              {issues.length > 0 ? (

                issues.map((issue) => (

                  <tr
                    key={issue._id}
                    className="hover:bg-blue-50 transition border-b"
                  >

                    {/* ISSUE */}

                    <td
                      onClick={() =>
                        navigate(`/admin/issue/${issue._id}`)
                      }
                      className="px-6 py-5 cursor-pointer"
                    >

                      <div className="flex items-center gap-4">

                        {issue.image?.length > 0 ? (

                          <img
                            src={issue.image}
                            alt=""
                            className="w-14 h-14 rounded-xl object-cover border"
                          />

                        ) : (

                          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                            📄
                          </div>

                        )}

                        <div>

                          <h3 className="font-semibold text-blue-700 hover:underline">
                            {issue.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {issue.description}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* REPORTER */}

                    <td className="px-6">

                      <div className="font-semibold">
                        {issue.reportedBy?.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        {issue.reportedBy?.email}
                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="text-center">

                      <span
                        className={`px-4 py-2 rounded-full font-medium ${getStatusColor(
                          issue.status
                        )}`}
                      >
                        {issue.status}
                      </span>

                    </td>

                    {/* PRIORITY */}

                    <td className="text-center">

                      <span
                        className={`px-4 py-2 rounded-full font-medium ${getPriorityColor(
                          issue.priority
                        )}`}
                      >
                        {issue.priority}
                      </span>

                    </td>

                    {/* UPDATE */}

                    <td className="text-center">

                      <select
                        value={issue.status}
                        onChange={(e) =>
                          updateStatus(
                            issue._id,
                            e.target.value
                          )
                        }
                        className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400"
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Rejected</option>
                      </select>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={5}
                    className="py-16 text-center text-gray-500"
                  >
                    No Issues Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

</div>
);
};

export default AdminDashboard;