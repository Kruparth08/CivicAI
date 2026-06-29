import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    try {
      const res = await axiosInstance.get(`/issues/${id}`);
      setIssue(res.data);
    } catch (error) {
      // console.log(error);
      setIssue(null);
    }
  };

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Loading Issue...
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
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

        {/* Image */}
        {issue.image && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 sm:mb-8">
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-56 sm:h-80 lg:h-[420px] object-contain bg-gray-100"
            />
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {/* LEFT */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">

            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
              Issue Information
            </h2>

            <div className="space-y-5 sm:space-y-6">

              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Description
                </p>
                <p className="text-gray-800 mt-1 leading-6 sm:leading-7 text-sm sm:text-base">
                  {issue.description}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Location
                </p>
                <p className="font-semibold mt-1 text-sm sm:text-base">
                  📍 {issue.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">

                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">
                    Status
                  </p>
                  <span
                    className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                      statusColor[issue.status] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">
                    Priority
                  </p>
                  <span
                    className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                      priorityColor[issue.priority] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          {/* Right */}

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

      <div>

        <p className="text-sm text-gray-500">
          Citizen Advice
        </p>

        <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-4">

          <p className="text-green-800 leading-7">
            {issue.citizenAdvice || "No advice available."}
          </p>

        </div>

      </div>

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
)}

      </div>

    </div>

  </div>

</div>
        </div>

      </div>
    </div>
  );
};

export default IssueDetails;