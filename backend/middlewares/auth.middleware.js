import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
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

export function authorize(role) {
  return (req, res, next) => {
    if (!req.user) throw new Error("Authorization must be called after token verification!");
    if (req.user?.role === role) {
      next();
    } else {
      res.status(401).json({ ok: false, message: "Unauthorized" });
    }
  };
}

