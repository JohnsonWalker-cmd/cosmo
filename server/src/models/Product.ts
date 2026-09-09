import { Schema , model } from "mongoose"

export interface ProductVariant{
    name : string ;
    optionType : "shade" | "size" | "default" 
    sku : string | null
    priceCents: number 
    stock : number
    stockStatus : "in_stock" | "restocking" | "out"
    swatchUrl : string | null
    sortOrder : number
}

export interface Product{
    slug : string
    name : string
    brand : string | null
    description : string
    categoryId : Schema.Types.ObjectId
    imageUrls : string[]
    featured: boolean
    variants : ProductVariant[]
    createdAt : Date
    updatedAt : Date
}

const variantSchema = new Schema<ProductVariant>({
    name : { type : String , required : true },
    optionType : { type : String , enum : ["shade" , "size" , "default"] , required : true },
    sku : { type : String , required : false , default : null},
    priceCents : { type : Number , required : true , min : 0},
    stock : { type : Number , default : 0, min: 0},
    stockStatus : { type : String , default : "in_stock" ,enum : ["in_stock" , "restocking" , "out"] , required : true },
    swatchUrl : { type : String , default : null},
    sortOrder : { type : Number  , default:0},
})

const productSchema = new Schema<Product>({
    slug : { type : String , required : true , unique : true},
    name : { type: String , required: true},
    brand: { type: String , default: null},
    description: { type: String , default: ""},
    categoryId: { type: Schema.Types.ObjectId , ref: "Category" , default : null},
    imageUrls: { type: [String] , default : []},
    featured: { type: Boolean , default: false},
    variants: { type: [variantSchema] , default : []},
}, {timestamps: true})

export const ProductModel = model<Product>("Product" , productSchema)

