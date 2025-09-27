import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req?.headers?.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorised",
    });
  }

  const token = header?.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.userId = payload.sub;
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
