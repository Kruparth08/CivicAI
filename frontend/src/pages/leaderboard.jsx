import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axiosInstance.get("/leaderboard");
      setUsers(res.data);
    } catch (error) {
      // console.log(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Loading Leaderboard...
          </p>
        </div>
      </div>
    );
  }

  const medal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const cardColor = (index) => {
    if (index === 0) return "border-yellow-400 bg-yellow-50";
    if (index === 1) return "border-gray-400 bg-gray-50";
    if (index === 2) return "border-orange-400 bg-orange-50";
    return "border-gray-200 bg-white";
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white mb-6 sm:mb-8">

          <h1 className="text-2xl sm:text-4xl font-bold">
            🏆 Community Leaderboard
          </h1>

          <p className="mt-2 sm:mt-3 text-blue-100 text-sm sm:text-lg max-w-2xl">
            Recognizing citizens who actively contribute to improving their community.
          </p>

        </div>

        {/* Empty state */}
        {users.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No users found on leaderboard yet.
          </div>
        ) : (

          <div className="space-y-4 sm:space-y-5">

            {users.map((user, index) => (
              <div
                key={user._id}
                className={`rounded-2xl border-2 shadow-md p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 hover:shadow-lg transition ${cardColor(index)}`}
              >

                {/* LEFT */}
                <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">

                  {/* Rank */}
                  <div className="text-2xl sm:text-3xl font-bold w-12 sm:w-16 text-center">
                    {medal(index)}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg sm:text-2xl font-bold shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* User info */}
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">
                      {user.name}
                    </h2>

                    <p className="text-gray-500 text-xs sm:text-sm break-all">
                      {user.email}
                    </p>
                  </div>

                </div>

                {/* RIGHT */}
                <div className="text-left sm:text-center">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Total Points
                  </p>

                  <h2 className="text-2xl sm:text-4xl font-bold text-blue-600">
                    {user.points}
                  </h2>

                  <p className="font-medium text-gray-600 text-sm sm:text-base">
                    pts
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Leaderboard;