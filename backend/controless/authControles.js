import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//...................................................................................................

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "password & email are required " });
  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(403).json({
        message: "user by this email address already register",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashPassword,
      username: req.body.username,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "you have registered successfully", newUser });
  } catch (res) {
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "password & email are required " });
  try {
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(404).json({ message: "email or password are wrong" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(403)
        .json({ message: "email or password are not right" });

    const accessToken = await jwt.sign(
      { _id: user.id, role: user.role },
      process.env.JWT_SECREt_KEY,
      { expiresIn: "2d" }
    );

    const refreshToken = await jwt.sign(
      { _id: user.id, role: user.role },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true, // not accessible via JS
      secure: true, // only over HTTPS
      sameSite: "None", // allow cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ accessToken, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0, // immediately expires
    });
    res.status(200).json({ message: "See you next time" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//...................................................................................................
export const refreshToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    // verify refresh token
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_KEY,
      (user, err) => {
        if (err) return res.status(401).json({ message: "invalid token" });
        return user;
      }
    );

    // generate new access token
    const accessToken = jwt.sign(
      { _id: decoded._id, role: decoded.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    // generate new refresh token
    const newRefreshToken = jwt.sign(
      { _id: decoded._id, role: decoded.role },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "7d" }
    );

    // set refresh token in cookie
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "invalid or expired token" });
  }
};
