import { Router } from "express";
import {signToken }from "../lib/jwt.js"
import { env } from "../env.js"
import { UserModel } from "../models/User.js"
import bcrypt from "bcryptjs"

export const authRouter = Router();

const COOKIE_OPTIONS ={
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
}

authRouter.post("/guest", async(_req, res,next)=> {
    try{
        const user = await UserModel.create({
            role: "guest",
            isAnonymous: true,
        })
        const token = signToken({ userId: user.id, role: user.role})
        res.cookie("token" , token, COOKIE_OPTIONS)
        res.json({ userId: user.id, role: user.role})
    }catch(err){
        next(err)
    }
})

authRouter.post("/signup", async (req, res, next) => {
    try{
        const { email , password } = req.body as { email?: string; password?: string}
        if(!email || !password){
            return res.status(400).json({ error: "Email and password required"})
        }
        if(password.length < 8){
            return res.status(400).json({ error: "Password must be at least 8 characters"})
        }

        const existing = await UserModel.findOne({ email })
        if(existing){
            return res.status(409).json({ error: "An account with that email already exists"})
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const user = await UserModel.create({
            email,
            passwordHash,
            role: "customer",
            isAnonymous: false,
        })

        const token = signToken({ userId: user.id, role: user.role})
        res.cookie("token" , token, COOKIE_OPTIONS)
        res.status(201).json({ userId: user.id, role: user.role})
    }catch(err){
        next(err)
    }
})

authRouter.post("/login", async (req,res , next) => {
    try{
        const { email , password } = req.body as { email?: string; password?: string}
    if(!email || !password){
        return res.status(400).json({ error: "Email and password required"})
    }
    const user = await UserModel.findOne({email})
    if(!user || !user.passwordHash){
        return res.status(401).json({error: "Invalid email or password"})
    }

    const isMatch = await bcrypt.compare(password , user.passwordHash)
    if(!isMatch){
        return res.status(401).json({error: "Invalid email or password"})
    }
    const token = signToken({ userId: user.id, role: user.role})
    res.cookie("token" , token, COOKIE_OPTIONS)
    res.json({userId: user.id, role: user.role})
    }catch(err){
        next(err)
    }
})