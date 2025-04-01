import path from "path";
import express from 'express'
import multer from "multer";


const router = express.Router();

const storage = multer.diskStorage({
    destination:  (req,file,cb)=>{
        cb(null, "uploads/");
    },
    filename: (req,file,cb)=>{
        const extname = path.extname(file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)
    }
});

const fileFilter = (req,file,cb)=>{
    const filetypes = /jpg|jpe?g|png|gif|webp|avif/;
    const mimetypes = /image\/jpe?g|png|gif|webp|avif/;

    const extname = path.extname(file.originalname).toLowerCase();

    const mimetype = file.mimetype;

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Images only'),false)
    }
};
const upload = multer({storage,fileFilter})
const uploadSingleImage = upload.single('image');

router.post("/",(req,res )=>{
    uploadSingleImage(req,res,(err)=>{
        if(err){
            res.status(400).json({ message: err.message})
        }else if(req.file){
            res.status(200).json({ message:"Image upload success",
            image: `/${req.file.path}`
            })
        }else{
            res.status(400).json({ message:"image upload failed"})
        }
    })
});


export default router