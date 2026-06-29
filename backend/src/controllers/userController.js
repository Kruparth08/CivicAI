const User = require("../models/User");

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateMyProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      profilePic,
      phone,
      city,
      state,
      bio,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.profilePic =
      profilePic || user.profilePic;
    user.phone =
      phone || user.phone;
    user.city =
      city || user.city;
    user.state =
      state || user.state;
    user.bio =
      bio || user.bio;

    const updatedUser =
      await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic:
        updatedUser.profilePic,
      phone: updatedUser.phone,
      city: updatedUser.city,
      state: updatedUser.state,
      bio: updatedUser.bio,
      points: updatedUser.points,
      badges: updatedUser.badges,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getPublicProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select(
      "name profilePic city state points badges createdAt"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { getMyProfile,updateMyProfile,getPublicProfile }