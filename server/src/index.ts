import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import { env } from "./env.js"
import { connectDb } from "./lib/db.js"

const app = express()

// credentials: true is required alongside origin (not "*") for the browser
// to actually send/receive our httpOnly auth cookie cross-origin in dev
// (frontend on :5173, API on :4000).
app.use(cors({ origin: env.clientOrigin, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get("/api/health", (_req, res) => {
  res.json({ ok: true })
})

// Central error handler: any route that calls next(err) — or throws inside
// an async handler wrapped by asyncHandler (added later) — ends up here
// instead of crashing the process or hanging the request.
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
