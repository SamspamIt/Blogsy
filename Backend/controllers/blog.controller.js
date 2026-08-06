import Blog from "../models/Blog.model.js";


// Function for slug
const generateSlug = (title)=>{
    return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};


//for all blogs
export const getAllBlogs = async(req,res)=>{
    try{
        const blogs = await Blog.find({
            isPublished:true
        })
        .populate("author","name profileImage")
        .sort({createdAt: -1 }); //new blog to be on top
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

//Each slug's extended version of blog
export const getBlogBySlug = async (req,res)=>{
    try{
        const blog = await Blog.findOne({ slug: req.params.slug})
        .populate(
            "author",
            "name profileImage bio"
        );
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }
        res.status(200).json(blog);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

// Admin Blogs 
export const createBlog = async (req,res)=>{
    try{
        const {title, content, category, excerpt, coverImage }=req.body;

        if(!title ||!content ||!category ){
            return res.status(400).json({
                message: "Title, content and category are required"
            });
        }
        const slug = generateSlug(title);

        const existingBlog = await Blog.findOne({ slug });
        if(existingBlog){
            return res.status(400).json({
                message: "A blog with this title already exists"
            });
        }

        const newBlog = await Blog.create({
            title, slug, content, category, excerpt, coverImage, 
            author: req.user.id
        });

        res.status(201).json(newBlog);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};


//Admin Update 
export const updateBlog = async (req, res)=>{
    try{
        const blog = await Blog.findById(req.params.id);

        if(!blog ){
            return res.status(404).json({
                message: "Blog not found"
            });
        }
        const {title, content, category, excerpt, coverImage, isPublished }= req.body;
        
        if(title && title !== blog.title){
            blog.slug = generateSlug(title);
            blog.title = title;
        }
        if(content) blog.content = content;
        if(category) blog.category = category;
        if(excerpt) blog.excerpt = excerpt;
        if(coverImage) blog.coverImage = coverImage;
        if(typeof isPublished === "boolean" ) blog.isPublished = isPublished;

        const updateBlog = await blog.save();

        res.status(200).json(updateBlog);
    }catch(error){
        res.status(500).json({
            message: error.message 
        });
    }
};

// Admin Delete  Blog 

export const deleteBlog = async ( req, res )=>{
    try{
        const blog = await Blog.findOne(req.params.id);

        if(!blog){
            return res.status(404).json({
                message: "Blog not found"
            });
        }
        await blog.deleteOne();

        res.status(200).json({
            message: "Blog deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};