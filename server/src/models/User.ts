import { Schema , model} from "mongoose";

export interface User{
    email ?: string
    role : "admin" | "customer" | "guest"
    passwordHash? : string
    isAnonymous : boolean
    createdAt : Date
    updatedAt : Date
}

const userSchema = new Schema<User>({
    email : { type : String , required : false , unique : true , sparse: true},
    role : { type : String , enum : ["admin" , "customer" , "guest"] , default : "guest"},
    passwordHash : { type : String , required : false},
    isAnonymous : { type : Boolean , default : true},
}, {timestamps: true})

export const UserModel = model<User>("User" , userSchema)
