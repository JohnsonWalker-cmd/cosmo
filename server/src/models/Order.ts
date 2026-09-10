import {Schema , model} from "mongoose";


export interface OrderItem{
    productId : Schema.Types.ObjectId | null;
    quantity: number;
    nameSnapshot : string;
    unitPriceCents : number;
    variantId : Schema.Types.ObjectId | null;
}

export interface Order{
    userId : Schema.Types.ObjectId | null;
    items : OrderItem[];
    totalCents : number;
    status : "pending" | "paid" | "ready_for_pickup" | "picked_up";
    paystackReference?: string;
    customerName : string;
    customerPhone: string;
    createdAt : Date;
    updatedAt : Date;
}


const orderItemSchema = new Schema<OrderItem>({
    productId : { type : Schema.Types.ObjectId , ref : "Product" , default : null},
    quantity : { type : Number , required : true , min : 1},
    nameSnapshot : { type : String , required : true},
    unitPriceCents : { type : Number , required : true , min : 0},
    variantId : { type : Schema.Types.ObjectId ,  default : null},
})

const orderSchema = new Schema<Order>({
    userId : { type : Schema.Types.ObjectId , ref : "User" , default : null},
    items : { type : [orderItemSchema] , required : true},
    totalCents : { type : Number , required : true , min : 0},
    status : { type : String , enum : ["pending" , "paid" , "ready_for_pickup" , "picked_up"] , default: "pending"},
    // Omit when unpaid — sparse unique still indexes stored null, so default: null
    // would make the second pending checkout fail with a duplicate-key error.
    paystackReference : { type : String , required : false , unique: true , sparse: true},
    customerName : { type : String , required : true},
    customerPhone : { type : String , required : true},
}, {timestamps: true})

export const OrderModel = model<Order>("Order" , orderSchema)
