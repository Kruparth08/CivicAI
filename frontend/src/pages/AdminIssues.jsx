import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AdminIssues = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);

  const [filter, setFilter] = useState({
    status: "",
    priority: "",
    search: "",
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async (customFilter = filter) => {
    try {
      const query = new URLSearchParams(customFilter).toString();

      const res = await axiosInstance.get(
        `/issues/admin/all?${query}`
      );

      setIssues(res.data);
    } catch (error) {
      // console.log(error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white px-8 py-10 shadow-xl">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold">
            Manage Civic Issues
          </h1>

          <p className="mt-2 text-blue-100 text-lg">
            Review, search and manage every issue reported by citizens.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* FILTER SECTION */}

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 mb-8">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Filters
              </h2>

              <p className="text-gray-500">
                Quickly find specific issues.
              </p>

            </div>

            <div className="text-blue-600 font-semibold">
              Total Issues : {issues.length}
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <input
              type="text"
              name="search"
              placeholder="Search issue title..."
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              name="status"
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>

            <select
              name="priority"
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Emergency</option>
            </select>

          </div>

        </div>

        {/* ISSUE CARDS */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {issues.length > 0 ? (

  issues.map((issue) => (

    <div
      key={issue._id}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-2"
    >

      {/* IMAGE */}

      <div className="relative overflow-hidden">

        {issue.image?.length > 0 ? (

          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-60 object-cover hover:scale-110 transition duration-500"
          />

        ) : (

          <div className="h-60 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-6xl">
            📄
          </div>

        )}

        <div className="absolute top-4 left-4">

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${getStatusColor(
              issue.status
            )}`}
          >
            {issue.status}
          </span>

        </div>

        <div className="absolute top-4 right-4">

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${getPriorityColor(
              issue.priority
            )}`}
          >
            {issue.priority}
          </span>

        </div>

      </div>

      {/* BODY */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">
          {issue.title}
        </h2>

        <p className="text-gray-500 mb-4 flex items-center gap-2">
          📍 {issue.location}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {issue.category}
          </span>

          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            {issue.department}
          </span>

        </div>

        <p className="text-gray-600 line-clamp-3 leading-7 mb-5">
          {issue.aiSummary || issue.description}
        </p>

        <div className="border-t pt-4 space-y-2">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Reporter
            </span>

            <span className="font-semibold">
              {issue.reportedBy?.name}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Email
            </span>

            <span className="text-sm text-gray-700">
              {issue.reportedBy?.email}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Reported
            </span>

            <span className="text-sm">
              {new Date(issue.createdAt).toLocaleDateString()}
            </span>

          </div>

        </div>

        <button
          onClick={() =>
            navigate(`/admin/issue/${issue._id}`)
          }
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition"
        >
          View Full Details →
        </button>

      </div>

    </div>

  ))

) : (

            <div className="col-span-full">

            <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-200">

              <div className="text-7xl mb-6">
                📭
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                No Issues Found
              </h2>

              <p className="text-gray-500 mb-8">
                Try changing your search or filter options.
              </p>

              <button
                onClick={() => {
                  setFilter({
                    status: "",
                    priority: "",
                    search: "",
                  });

                  fetchIssues({
                    status: "",
                    priority: "",
                    search: "",
                  });
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Clear Filters
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>
  );
};

export default AdminIssues;