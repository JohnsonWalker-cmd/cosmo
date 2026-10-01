import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import { env } from "./env.js"
import { connectDb } from "./lib/db.js"
import { authMiddleware } from "./middleware/auth.js"
import authRoutes from "./routes/auth.js"
import cartRoutes from "./routes/cart.js"
import catalogRoutes from "./routes/catalog.js"
import orderRoutes from "./routes/orders.js"

const app = express()

app.use(cors({ origin: env.clientOrigin, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(authMiddleware)

app.get("/api/health", (_req, res) => {
  res.json({ ok: true })
})

app.use("/api/auth", authRoutes)
app.use("/api", catalogRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  const message = err instanceof Error ? err.message : "Something went wrong"
  res.status(500).json({ error: message })
})

async function main() {
  await connectDb()
  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`)
  })
}

main().catch((err) => {
  console.error("Failed to start server:", err)
  process.exit(1)
})
