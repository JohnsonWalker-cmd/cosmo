import { Schema , model} from "mongoose"


export interface Category{
    slug : string ;
    name : string ;
    sortOrder : number ;
    createdAt : Date ;
    updatedAt : Date ;
}


const categorySchema = new Schema<Category>({
    slug : {
        type : String ,
        required : true ,
        unique : true , // tells Mongoose to build a unique index in MongoDB
    },
    name : {
        type : String ,
        required : true
    },
    sortOrder : {
        type: Number ,
        default : 0
    }
}, {timestamps: true})

export const CategoryModel = model<Category>("Category" , categorySchema)
