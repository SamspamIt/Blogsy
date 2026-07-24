import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema(     //blueprint of user's data
    {
        role:{
            type: String,
            enum:["user","admin"],
            default: "user",
        },
        name:{
            type: String,
            required: [true,"Name is required"],
            trim: true, //to remove spaces
        },
        email:{
            type: String,
            required: [true,"Email is required"],
            unique: true, 
            trim: true,  //to remove spaces
            lowercase: true, // to be written in lower case only
        },
        password:{
            type: String,    // plain password for now
            required: [true,"Password is required"],
            minlength: 8 ,
        },
        profileImage:{
            type: String,   // image to be  stored in image kit for now
            default: "",
        },
        bio:{
            type: String,
            default: "",
            maxlength: 100,
        },
    },{
        timestamps:true,  // when was it created or updated
    }
);

const User = mongoose.model("User",userSchema); //to build connection

export default User;