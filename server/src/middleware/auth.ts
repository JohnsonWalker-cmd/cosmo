import express from "express"
import { verifyToken } from "../lib/auth.js"

export function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token = req.cookies?.auth

  if (!token) {
    return next()
  }

  try {
    const payload = verifyToken(token)
    res.locals.auth = payload
  } catch {
    res.clearCookie("auth")
  }

  next()
}

export function requireAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!res.locals.auth) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  next()
}

export function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!res.locals.auth) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (res.locals.auth.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: admin role required" })
  }

  next()
}
