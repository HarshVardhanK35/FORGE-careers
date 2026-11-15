import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET } from "../config/env";

/**
 * interface defines shape for TS
 * extends Request = takes everything from express's request type (body, cookies, params so on...) and adds to it
 * adds userId to the already existing "Request" 
 *  
 */
export interface AuthRequest extends Request {
  userId?: string;
}

export function protect(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.cookies?.accessToken;
  if (!token) {
    res.status(401).json({ message: "Not signed in" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);
    if (typeof payload === "string" || !payload.sub) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
