
import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name : {
        type : mongoose.Schema.Types.String,
        required : true,
    },
    price : {
        type : mongoose.Schema.Types.Number,
        required : true,
    },
    description : {
        type : mongoose.Schema.Types.String,
    },
    image : {
        type : mongoose.Schema.Types.String,
    },
    category : {
        type : mongoose.Schema.Types.String,
    },
    stock : {
        type : mongoose.Schema.Types.Number,
        default : 0,
    },
    features : [
        {
            label : mongoose.Schema.Types.String,
            value : mongoose.Schema.Types.String
        }
    ],
    rating : {
        average : {
            type : mongoose.Schema.Types.Number,
            default : 0
        },
        count : {
            type : mongoose.Schema.Types.Number,
            default : 0
        }
    },
    createdAt : {
        type : mongoose.Schema.Types.Date,
        default : Date.now
    }
});

export const Product = new mongoose.model("Product",ProductSchema);