import { Schema , model} from "mongoose"

export interface CartItem{
    productVariantId : Schema.Types.ObjectId
    quantity : number
    productId: Schema.Types.ObjectId
}

export interface Cart{
    userId : Schema.Types.ObjectId
    items : CartItem[]
    createdAt : Date
    updatedAt : Date
}

const cartItemSchema = new Schema<CartItem>({
    productVariantId : { type : Schema.Types.ObjectId , required: true},
    quantity : { type : Number , required: true , min: 1},
    productId: { type : Schema.Types.ObjectId , ref: "Product" , required: true},
}, {timestamps: false})

const cartSchema = new Schema<Cart>({
    userId : { type : Schema.Types.ObjectId , ref: "User" , unique : true , required: true},
    items : { type : [cartItemSchema] , default: []},
}, {timestamps: true})

export const CartModel = model<Cart>("Cart" , cartSchema)