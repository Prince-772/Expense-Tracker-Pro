const clearJWTtoken = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
};
const setJWTtoken = (res, newToken) => {
  res.cookie("accessToken", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
};

module.exports = { setJWTtoken, clearJWTtoken };
