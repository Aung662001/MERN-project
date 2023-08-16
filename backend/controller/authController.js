const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unautorized" });
  }
  console.log(password, foundUser.password);
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res
      .status(401)
      .json({ message: "UserName and Password are Not Match!" });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.send({ accessToken });
});
//refresh Route
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "No cookies found" });
  }

  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Unautorized" });

      const foundUser = await User.findOne({
        username: decoded.username,
      });
      if (!foundUser) return res.status(401).json({ message: "Unautorized" });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    })
  );
});
//logout Route
const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).json({ message: "No Content" });
  }
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ message: "Cookie cleared" });
};
module.exports = { login, refresh, logout };
