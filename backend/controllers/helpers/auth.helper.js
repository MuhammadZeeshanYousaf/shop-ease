import jwt from "jsonwebtoken";
import RefreshToken from "../../models/refreshToken.model.js";

export const generateAccessToken = user => {
  return jwt.sign(
    {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m", // Access token expires in 15 minutes
    }
  );
};

export const generateRefreshToken = async user => {
  const refreshToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "1d" } // Refresh token expires in 1 day (24h)
  );

  // Save the refresh token in the database
  const refreshTokenObj = new RefreshToken({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // after 1 day (24h)
  });

  await refreshTokenObj.save();

  return refreshToken;
};

// Extract refresh_token from cookies
export const cookieRefreshToken = headers => {
  const cookies = headers["set-cookie"]?.[0]?.split("=") ?? [];
  const refreshTokenExist = cookies.find(c => c === "jwt");
  return cookies[cookies.indexOf(refreshTokenExist) + 1];
};
