import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AdminIssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const fetchIssue = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/issues/${id}`);

      setIssue(res.data);
    } catch (error) {
      // console.log(error);
      setIssue(null);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.patch(`/issues/${id}/status`, {
        status,
      });

      fetchIssue();
    } catch (error) {
      // console.log(error);
      alert(error.response?.data?.message || "Failed to update");
    }
  };

  const updateField = async (field, value) => {
    try {
      await axiosInstance.put(`/issues/${issue._id}`, {
        [field]: value,
      });

      fetchIssue();
    } catch (error) {
      // console.log(error);
      alert(error.response?.data?.message || "Failed to update");
    }
  };

  const deleteIssue = async () => {
    if (!window.confirm("Delete this issue?")) return;

    try {
      await axiosInstance.delete(`/issues/${issue._id}`);

      alert("Issue Deleted");

      navigate("/admin/issues");
    } catch (error) {
      // console.log(error);
      alert(error.response?.data?.message || "Failed to delete");
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Issue Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-6 sm:p-8 shadow-lg mb-6 sm:mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-2xl sm:text-4xl font-bold break-words">
                {issue.title}
              </h1>

              <p className="mt-2 sm:mt-3 text-blue-100 text-sm sm:text-base">
                Detailed information about the reported civic issue.
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="self-start md:self-auto bg-white text-blue-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              ← Back
            </button>

          </div>

        </div>

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {issue.image?.length > 0 && (
            <img
              src={issue.image[0]}
              alt=""
              className="w-full h-56 sm:h-80 lg:h-[420px] object-contain bg-gray-100"
            />
          )}

          <div className="p-8">

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div>

                <h1 className="text-4xl font-bold text-slate-800 mb-3">
                  {issue.title}
                </h1>

                <p className="text-gray-500 mb-2">
                  📍 {issue.location}
                </p>

                <p className="text-gray-700 leading-8">
                  {issue.description}
                </p>

              </div>

              <div className="space-y-3 lg:text-right">

                <span
                  className={`inline-block px-4 py-2 rounded-full font-semibold ${getStatusColor(issue.status)}`}
                >
                  {issue.status}
                </span>

                <br />

                <span
                  className={`inline-block px-4 py-2 rounded-full font-semibold ${getPriorityColor(issue.priority)}`}
                >
                  {issue.priority}
                </span>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div className="bg-slate-50 rounded-2xl p-5">

                <h2 className="font-bold text-lg mb-4">
                  Reporter Details
                </h2>

                <p>
                  <strong>Name:</strong>{" "}
                  {issue.reportedBy?.name}
                </p>

                <p className="mt-2">
                  <strong>Email:</strong>{" "}
                  {issue.reportedBy?.email}
                </p>

                <p className="mt-2">
                  <strong>Reported:</strong>{" "}
                  {new Date(issue.createdAt).toLocaleString()}
                </p>

              </div>

<div className="space-y-8">

  {/* AI Analysis */}

  <div className="bg-white rounded-2xl shadow-lg p-8">

    <div className="flex items-center justify-between mb-6">

      <h2 className="text-2xl font-bold">
        🤖 AI Analysis
      </h2>

      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
        Gemini AI
      </span>

    </div>

    <div className="space-y-6">

      <div>

        <p className="text-sm text-gray-500">
          Category
        </p>

        <p className="font-semibold mt-1">
          {issue.category || "Not analyzed"}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-500">
          Assigned Department
        </p>

        <p className="font-semibold mt-1">
          {issue.department || "Not assigned"}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-500">
          AI Summary
        </p>

        <p className="text-gray-800 leading-7 mt-2">
          {issue.aiSummary || "No summary available."}
        </p>

      </div>

      {/* <div> */}

        {/* <p className="text-sm text-gray-500">
          Citizen Advice
        </p>

        <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-4">

          <p className="text-green-800 leading-7">
            {issue.citizenAdvice || "No advice available."}
          </p>

        </div> */}

      {/* </div> */}

      <div>

        <p className="text-sm text-gray-500">
          Suggested Government Action
        </p>

        <div className="mt-2 bg-orange-50 border border-orange-200 rounded-xl p-4">

          <p className="text-orange-800 leading-7">
            {issue.governmentAction || "No recommendation available."}
          </p>

        </div>

      </div>

      <div>

        {/* <p className="text-sm text-gray-500">
          Estimated Resolution Time
        </p>

        <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-xl p-4">

          <p className="text-indigo-800 font-semibold">
            {issue.estimatedDays
              ? `${issue.estimatedDays} Days`
              : "Not available"}
          </p>

        </div> */}
        <div>

  <p className="text-sm text-gray-500">
    AI Confidence
  </p>

  <div className="mt-2 bg-purple-50 border border-purple-200 rounded-xl p-4">

    <p className="text-purple-800 font-semibold">
      {issue.aiConfidence || 0}%
    </p>

  </div>
</div>
{/* 
{issue.aiQuestions?.length > 0 && (
  <div>

    <p className="text-sm text-gray-500 mb-3">
      AI Needs More Information
    </p>

    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">

      <ul className="space-y-2 list-disc list-inside">

        {issue.aiQuestions.map((q, index) => (
          <li key={index}>{q}</li>
        ))}

      </ul>

    </div>

  </div>
)} */}

      </div>

    </div>

  </div>

</div>

            </div>

{/* ADMIN ACTIONS */}

<div className="grid lg:grid-cols-2 gap-8 mt-10">

  <div className="bg-white rounded-2xl shadow p-6">

    <h2 className="text-2xl font-bold mb-5">
      Update Status
    </h2>

    <div className="grid grid-cols-2 gap-4">

      <button
        onClick={() =>
          updateStatus(issue._id, "Pending")
        }
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold"
      >
        Pending
      </button>

      <button
        onClick={() =>
          updateStatus(issue._id, "In Progress")
        }
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold"
      >
        In Progress
      </button>

      <button
        onClick={() =>
          updateStatus(issue._id, "Resolved")
        }
        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
      >
        Resolved
      </button>

      <button
        onClick={() =>
          updateStatus(issue._id, "Rejected")
        }
        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
      >
        Reject
      </button>

    </div>

  </div>


  <div className="bg-white rounded-2xl shadow p-6">

    <h2 className="text-2xl font-bold mb-5">
      Change Priority
    </h2>

    <div className="grid grid-cols-2 gap-4">

      {["Low", "Medium", "High", "Emergency"].map((priority) => (

        <button
          key={priority}
          onClick={() =>
            updateField("priority", priority)
          }
          className={`text-white rounded-xl py-3 font-semibold ${
            priority === "Low"
              ? "bg-green-600"
              : priority === "Medium"
              ? "bg-yellow-500"
              : priority === "High"
              ? "bg-orange-500"
              : "bg-red-600"
          }`}
        >
          {priority}
        </button>

      ))}

    </div>

  </div>

</div>


<div className="grid lg:grid-cols-2 gap-8 mt-8">

  <div className="bg-white rounded-2xl shadow p-6">

    <h2 className="text-2xl font-bold mb-5">
      Assign Department
    </h2>

    <select
      value={issue.department}
      onChange={(e) =>
        updateField("department", e.target.value)
      }
      className="w-full border rounded-xl p-4"
    >
      <option>Municipal Corporation</option>
      <option>Road Department</option>
      <option>Water Department</option>
      <option>Electricity Department</option>
      <option>Police Department</option>
      <option>Sanitation Department</option>
      <option>Parks Department</option>
    </select>

  </div>


  <div className="bg-white rounded-2xl shadow p-6">

    <h2 className="text-2xl font-bold mb-5">
      Change Category
    </h2>

    <select
      value={issue.category}
      onChange={(e) =>
        updateField("category", e.target.value)
      }
      className="w-full border rounded-xl p-4"
    >
      <option>Road Damage</option>
      <option>Garbage</option>
      <option>Water Supply</option>
      <option>Street Light</option>
      <option>Sewage</option>
      <option>Traffic</option>
      <option>Electricity</option>
      <option>Other</option>
    </select>

  </div>

</div>

<div className="mt-12 border-t pt-10">

  <div className="bg-red-50 border border-red-200 rounded-3xl p-8">

    <h2 className="text-3xl font-bold text-red-600 mb-2">
      Danger Zone
    </h2>

    <p className="text-gray-600 mb-6">
      This action is permanent. Once an issue is deleted, it cannot be recovered.
    </p>

    <button
      onClick={deleteIssue}
      className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
    >
      🗑 Delete Issue
    </button>

  </div>

</div>

        </div>

      </div>

    </div>
    </div>
  );
};

export default AdminIssueDetails;