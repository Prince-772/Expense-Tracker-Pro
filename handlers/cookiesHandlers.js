const clearJWTtoken = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"lax",
  });
};
const setJWTtoken = (res, newToken) => {
  res.cookie("accessToken", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"lax",
  });
};

module.exports = { setJWTtoken, clearJWTtoken };
