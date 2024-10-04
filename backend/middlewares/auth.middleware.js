import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")?.[1];
  if (!token) return res.status(401).json({ ok: false, error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(403).json({ ok: false, message: "Token invalid" });
  }
}

export default verifyToken;
