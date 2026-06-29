const sendToken = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
    process.env.NODE_ENV === "production"
      ? "None"
      : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = sendToken;