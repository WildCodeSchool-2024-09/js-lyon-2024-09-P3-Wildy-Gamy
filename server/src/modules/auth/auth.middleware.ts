import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const blacklistedTokens = new Set<string>();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Accès refusé, token manquant" });
  }

  if (blacklistedTokens.has(token)) {
    return res
      .status(401)
      .json({ message: "Token expiré, veuillez vous reconnecter" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }
    // (req as any).user = user;
    next();
  });
};

export const blacklistToken = (token: string) => {
  blacklistedTokens.add(token);
};
