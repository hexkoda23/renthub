import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase";
import { env } from "../config/env";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    // Dev mode bypass
    if (idToken.startsWith("dev-token-")) {
      console.log("🛠️ Dev Mode: Bypassing Auth verification");
      const devUserId = idToken.replace("dev-token-", "");
      (req as any).user = { uid: devUserId, email: "dev@example.com" };
      return next();
    }

    // Dev bypass if Firebase Admin is not initialized
    if (env.NODE_ENV === "development" && typeof auth.verifyIdToken !== "function") {
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
