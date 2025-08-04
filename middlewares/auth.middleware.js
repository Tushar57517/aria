import jwt from "jsonwebtoken";
import Blacklist from "../models/blacklist.model.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  try {
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ error: "access denied" });

    const token = authHeader.split(" ")[1];

    const exisitingToken = await Blacklist({ token });
    if (exisitingToken)
      return res.status(401).json({ error: "token already blacklisted" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ error: "invalid or expired token" });

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(`Auth Middleware Error: ${error.message}`);
    return res.status(500).json({ error: "internal server error" });
  }
};

export default verifyToken;
