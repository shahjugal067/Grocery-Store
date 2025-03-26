import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';


const authenticate = async(req ,res ,next) => {
    let token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next();
        } catch (error) {
            console.log(error)
            
            res.status(401).json({ message: "not authorized token failed"})
        }
        }else{
            res.status(401).json({ message: 'Not authorized no token available'})

        }
    };
    
    const authorizeAdmin = (req,res,next)=>{
        if(req.user && req.user.isAdmin){
            next();
        }else{
            res.status(401).json({ message:"not authorized as admin"})
        }
    };

    export {authenticate,authorizeAdmin};
