// Reads and validates process.env once at boot, so a missing var fails loudly
// on startup instead of causing a confusing error deep inside a request.

import "dotenv/config"

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

export const env = {
  mongodbUri: required("MONGODB_URI"),
  jwtSecret: required("JWT_SECRET"),
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  port: Number(process.env.PORT ?? 4000),
  isProduction: process.env.NODE_ENV === "production",
}
