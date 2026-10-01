import "dotenv/config"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import { connectDb } from "../lib/db.ts"
import { UserModel } from "../models/User.ts"

async function main() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error("Usage: npx tsx src/scripts/createAdmin.ts <email> <password>")
    process.exit(1)
  }

  await connectDb()

  const existing = await UserModel.findOne({ email })
  if (existing) {
    console.error(`A user with email ${email} already exists`)
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const admin = await UserModel.create({
    email,
    passwordHash,
    role: "admin",
    isAnonymous: false,
  })

  console.log(`Admin created: ${admin.email} (${admin.id})`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})