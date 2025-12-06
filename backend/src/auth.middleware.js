import jwt from "jsonwebtoken";
import User from "./user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // HTTP-only cookie

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
