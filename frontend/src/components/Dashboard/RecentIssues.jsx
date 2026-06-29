const RecentIssues = ({ issues }) => {
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
    <div className="w-full">

      {/* HEADER */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
        Recent Issues
      </h2>

      {/* EMPTY STATE */}
      {issues.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center text-gray-500">
          No issues found.
        </div>
      ) : (
        <div className="space-y-4">

          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition"
            >

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {issue.title}
              </h3>

              {/* META ROW */}
              <div className="flex flex-wrap gap-2 text-sm">

                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    statusColor[issue.status] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {issue.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    priorityColor[issue.priority] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {issue.priority}
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                  {issue.category || "Other"}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default RecentIssues;