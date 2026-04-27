import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    
    // Dev bypass if Firebase is not initialized
    if (Object.keys(auth).length === 1 && auth.onAuthStateChanged) {
      console.log("🛠️ Dev Mode: Bypassing Auth verification");
      (req as any).user = { uid: "dev-user-123", email: "dev@example.com" };
      return next();
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};
