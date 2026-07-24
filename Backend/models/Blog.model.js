import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true,"Title is required"],
            trim: true,
        },
        content:{
            type: String,
            required: [true,"Content is required"],
        },
        category:{
            type: String,
            required:[true,"Category is required"],
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        slug:{                     //in short URL friendly version of title
            type:String,
            required: true,
            unique: true,
            lowercase: true,
        },
        excerpt:{                 // preview text 
            type: String,
            maxlength: 200,
        },
        coverImage:{
            type: String,
            default: "",
        },
        likes:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        isPublished: {
            type: Boolean,
            default: true,
        },
    },{
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog",blogSchema);

export default Blog;