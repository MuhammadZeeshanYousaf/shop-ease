import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { cookieRefreshToken, generateAccessToken, generateRefreshToken } from "./helpers/auth.helper.js";
import RefreshToken from "../models/refreshToken.model.js";

// User Register
export const registerUser = async (req, res) => {
  const { firstName, lastName = "", email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ firstName, lastName, email, role, password: hashedPassword });

  try {
    await user.save();

    // Creating access token
    const token = generateAccessToken(user);
    // Creating refresh token with expiry more than access token
    const refreshToken = await generateRefreshToken(user);

    // Assigning refresh token in http-only cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(201).json({ ok: true, token, message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ ok: false, message: "Registration failed", error: e.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ ok: false, message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Creating access token
    const token = generateAccessToken(user);
    // Creating refresh token with expiry more than access token
    const refreshToken = await generateRefreshToken(user);

    // Assigning refresh token in http-only cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({ ok: true, token });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Login failed" });
  }
};

// User Refresh access/bearer token
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = cookieRefreshToken(req.headers);

    if (!refreshToken) {
      return res.status(400).json({ ok: false, message: "Refresh token is required" });
    }

    // Check if the refresh token exists in the database
    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
    }).populate("user");

    if (!storedToken) {
      return res.status(406).json({ ok: false, message: "Invalid refresh token" });
    }

    // Verifying refresh token
    const decodedUser = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const { user } = storedToken;

    if (decodedUser.email === user.email && decodedUser.userId === user._id?.toString()) {
      const newAccessToken = generateAccessToken(user);
      return res.status(201).json({ ok: true, token: newAccessToken });
    } else {
      throw new Error("User invalid");
    }
  } catch (e) {
    res.status(500).json({ ok: false, message: "Refresh failed", error: e.message });
  }
};

// User logout
export const logoutUser = async (req, res) => {
  const refreshToken = cookieRefreshToken(req.headers);

  if (!refreshToken) {
    return res.status(400).json({ ok: false, message: "Refresh token is required" });
  }

  try {
    // Remove the refresh token from the database
    const deletedToken = await RefreshToken.findOneAndDelete({ token: refreshToken });
    if (!deletedToken) throw new Error("Token Invalid");

    res.status(200).json({ ok: true, message: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};
