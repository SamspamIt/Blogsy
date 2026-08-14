import getImageKit from "../config/imagekit.js";

export const uploadImage = async ( req , res )=>{
    try{
        const{ image , fileName } = req.body;

        if(!image || !fileName ){
            return res.status(400).json({
                message:"Image and fileName are required"
            });
        }
        const imagekit=getImageKit();

        const result = await imagekit.upload({
            file: image,
            fileName: fileName,
            folder: "/blogsy",
        });
        res.status(200).json({
            url: result.url
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}