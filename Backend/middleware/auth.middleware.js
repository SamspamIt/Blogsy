import jwt from "jsonwebtoken";

export const protect =(req,res,next)=>{
    try{
        const token = req.cookies.token;
        
        if(!token){
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }
    catch(error){
        res.status(401).json({
            message: "Not authorized, token failed"
        });
    }
};

export const isAdmin = (req,res, next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(403).json({
            message: "Access denied, admin only"
        });
    }
}