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
    return res.sendStatus(401).json({ message: "Unautorized" });
  }
  const match = bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res
      .status(401)
      .json({ message: "UserName and Password Are Not Match" });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
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
  if (!cookies?.jwt)
    return res.statusCode(401).json({ message: "Unautorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.sendStatus(401).json({ message: "Unautorized" });

      const foundUser = await User.find({ username: decoded.username });

      if (!foundUser)
        return res.sendStatus(401).json({ message: "Unautorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      res.json({ accessToken });
    })
  );
});
//logout Route
const logout = async (req, res) => {
  const cookies = req.cookies;
  console.log(req.cookies);
  if (!cookies?.jwt) {
    console.log("no jwt token");
    return res.status(204).json({ message: "No Content" });
  }
  console.log("has jwt token");
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ message: "Cookie cleared" });
};
module.exports = { login, refresh, logout };
