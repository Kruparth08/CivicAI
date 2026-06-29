import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const fetchMyIssues = async () => {
    try {
      const res = await axiosInstance.get("/issues/my");
      setIssues(res.data);
    } catch (error) {
      // console.log(error);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const priorityColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Emergency: "bg-red-100 text-red-700",
  };

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.toLowerCase().includes(search.toLowerCase()) ||
      (issue.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this issue?")) return;

      await axiosInstance.delete(`/issues/${id}`);

      setIssues((prev) => prev.filter((issue) => issue._id !== id));

      alert("Issue deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = async (issue) => {
    try {
      const title = prompt("Edit title", issue.title);
      const description = prompt("Edit description", issue.description);
      const location = prompt("Edit location", issue.location);

      if (!title || !description || !location) return;

      const res = await axiosInstance.put(`/issues/${issue._id}`, {
        title,
        description,
        location,
      });

      setIssues((prev) =>
        prev.map((i) => (i._id === issue._id ? res.data.issue : i))
      );

      alert("Issue updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            Loading Your Issues...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white mb-6 sm:mb-8">

          <h1 className="text-2xl sm:text-4xl font-bold">
            My Reported Issues
          </h1>

          <p className="mt-2 sm:mt-3 text-blue-100 text-sm sm:text-lg">
            Track the progress of your civic reports
          </p>

        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-5 mb-6 sm:mb-8">

          <input
            type="text"
            placeholder="Search issues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* EMPTY STATE */}
        {filteredIssues.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">

            <div className="text-5xl sm:text-6xl mb-4">📭</div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
              No Issues Found
            </h2>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              {search
                ? "No results match your search."
                : "Start by reporting your first issue."}
            </p>

            <Link
              to="/create-issue"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-3 rounded-xl font-semibold transition"
            >
              Report Issue
            </Link>

          </div>
        ) : (

          /* GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

            {filteredIssues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
              >

                {/* IMAGE */}
                {issue.image ? (
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-44 sm:h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-44 sm:h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">

                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
                    {issue.title}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    📍 {issue.location}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mt-4">

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[issue.status] || "bg-gray-100 text-gray-700"}`}>
                      {issue.status}
                    </span>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor[issue.priority] || "bg-gray-100 text-gray-700"}`}>
                      {issue.priority || "Medium"}
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                      {issue.category || "Other"}
                    </span>

                  </div>

                  {/* ACTIONS (FIXED UX) */}
                  <div className="mt-5 flex flex-col gap-2">

                    <Link
                      to={`/issues/${issue._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-center font-semibold text-sm sm:text-base"
                    >
                      View Details
                    </Link>

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleEdit(issue)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2.5 rounded-xl font-semibold text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(issue._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-semibold text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyIssues;