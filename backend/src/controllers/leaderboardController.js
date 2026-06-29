const User = require(
  "../models/User"
);

const getLeaderboard =
  async (req, res) => {
    try {
      const users =
        await User.find()
          .select(
            "name email points profilePic"
          )
          .sort({
            points: -1,
          })
          .limit(10);

      res.status(200).json(
        users
      );
    } catch (error) {
      // console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  getLeaderboard,
};