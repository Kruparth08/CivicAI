import ProfileForm from "../components/ProfileForm";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Loading Profile...
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

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">

            {/* Avatar */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white text-blue-700 flex items-center justify-center text-2xl sm:text-4xl font-bold shadow-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="min-w-0">

              <h1 className="text-2xl sm:text-4xl font-bold break-words">
                {user.name}
              </h1>

              <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base break-all">
                {user.email}
              </p>

              <p className="text-blue-200 mt-1 sm:mt-2 text-xs sm:text-sm">
                CivicAI Community Member
              </p>

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">

          <div className="bg-white rounded-2xl shadow p-5 sm:p-6 text-center">
            <h3 className="text-gray-500 text-xs sm:text-sm">Points</h3>
            <p className="text-xl sm:text-3xl font-bold text-blue-600 mt-2">
              {user.points || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 sm:p-6 text-center">
            <h3 className="text-gray-500 text-xs sm:text-sm">Role</h3>
            <p className="text-lg sm:text-2xl font-bold text-green-600 mt-2 capitalize">
              {user.role}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 sm:p-6 text-center">
            <h3 className="text-gray-500 text-xs sm:text-sm">City</h3>
            <p className="text-sm sm:text-xl font-semibold mt-2">
              {user.city || "Not Added"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 sm:p-6 text-center">
            <h3 className="text-gray-500 text-xs sm:text-sm">State</h3>
            <p className="text-sm sm:text-xl font-semibold mt-2">
              {user.state || "Not Added"}
            </p>
          </div>

        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {/* INFO CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">

            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
              Profile Information
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-xs sm:text-sm text-gray-500">Full Name</p>
                <p className="font-semibold text-base sm:text-lg">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-500">Email</p>
                <p className="font-semibold text-base sm:text-lg break-all">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                <p className="font-semibold">
                  {user.phone || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-500">City</p>
                <p className="font-semibold">
                  {user.city || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-500">State</p>
                <p className="font-semibold">
                  {user.state || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-500">Bio</p>
                <p className="leading-6 sm:leading-7 text-sm sm:text-base">
                  {user.bio || "No bio added yet."}
                </p>
              </div>

            </div>

          </div>

          {/* EDIT FORM */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">

            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
              Edit Profile
            </h2>

            <ProfileForm />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;