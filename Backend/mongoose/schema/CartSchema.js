
import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true
    },
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true,
            },
            quantity : {
                type : mongoose.Schema.Types.Number,
                default : 1,
                min : 1
            }
        }
    ],
    updatedAt : {
        type : mongoose.Schema.Types.Date,
        default : Date.now,
    }
});

export const Cart = new mongoose.model("Cart",CartSchema);

