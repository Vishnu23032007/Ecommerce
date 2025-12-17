
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    email : {
        type : mongoose.Schema.Types.String,
        required : true,
        unique : true
    },
    password : {
        type : mongoose.Schema.Types.String,
        required : true,
        unique : true
    }
});

export const User = new mongoose.model("User" , UserSchema);
