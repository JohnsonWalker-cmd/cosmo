import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import { env } from "./env.js"
import { connectDb } from "./lib/db.js"
import { authRouter } from "./routes/auth.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/orders.js"

const app = express()

app.use(cors({ origin: env.clientOrigin, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get("/api/health", (_req, res) => {
  res.json({ ok: true })
})

app.use("/api/auth", authRouter)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

// Central error handler: any route that calls next(err) — or throws inside
// an async handler wrapped by asyncHandler — ends up here
// instead of crashing the process or hanging the request.
// This MUST be registered after every route/router, since Express only
// routes next(err) calls to error handlers that come later in the stack.
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
