import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String, trim:true,
        required: 'Name is required!'
    },
    email: {
        type: String, trim: true,
        unique: "Email already exist!",
    },
    password:{
        type: String, 
        required: true,
    },
    id:{
        type: String
    }
    
})

export default mongoose.model("User", userSchema)