import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const ProfileForm = () => {
  const { user, getCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    // profilePic: user?.profilePic || "",
    phone: user?.phone || "",
    city: user?.city || "",
    state: user?.state || "",
    bio: user?.bio || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axiosInstance.put("/user/me", formData);
      await getCurrentUser();

      alert("Profile Updated");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* SECTION: BASIC INFO */}
      <div className="space-y-4">

        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

      </div>

      {/* SECTION: LOCATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>
          <label className="text-sm text-gray-600">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

      </div>

      {/* SECTION: BIO */}
      <div>
        <label className="text-sm text-gray-600">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>

      {/* PROFILE PIC (kept but cleaned visually) */}
      {/* <div>
        <label className="text-sm text-gray-600">Profile Picture URL</label>
        <input
          type="text"
          name="profilePic"
          value={formData.profilePic}
          onChange={handleChange}
          className="w-full mt-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div> */}

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>

    </form>
  );
};

export default ProfileForm;