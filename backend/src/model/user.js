import { Admin } from "mongodb";
import mongoose from "mongoose";

// 1- create a schema
// 2- model based off of that schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        required: true
    }
},
{
    timestamps:true
});

const User = mongoose.model("users collection",userSchema);

export default User;






