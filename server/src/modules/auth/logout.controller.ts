import type { Request, Response } from "express";
import { blacklistToken } from "./auth.middleware";

export const logoutUser = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Aucun token fourni" });
  }

  blacklistToken(token);
  return res.status(200).json({ message: "Déconnecté avec succès" });
};
