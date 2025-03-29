
import Category from "../models/category.model.js";

export const createCategory = async (req ,res ) =>{
    try {
        
        const {name} = req.body
        
        if(!name){
            return res.json(({message:" Name is required "}))
        }
        const existCategory  = await Category.findOne({ name })

        if(existCategory){
            return res.json({ message: "Category Already exist" })
        }
        const category = await new Category({name}).save();
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "server error"})
    }
};

export const updateCategory = async (req,res) =>{
    try {
        const { name } = req.body
        const { categoryId } = req.params;

        const category = await Category.findById({_id:categoryId})

        if(!category){
            return res.status(400).json({ message: "Category not found "})
        }
        category.name = name;
        const updatedCategory = await category.save()
        res.json(updatedCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error in update category "})
    }

};

export const removeCategory = async (req,res) =>{
    try {
        const remove = await Category.findByIdAndDelete(req.params.categoryId)
        res.json(remove)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error in delete category "})
    }
};

export const listCategory = async (req,res) => {
    try {
        const allCategory = await Category.find({})
        res.json(allCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:"Server error in get  category"})
    }
};
export const readCategory = async (req,res) => {
    try {
        const category = await Category.findById({_id:req.params.id})
        res.json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:"Server error in read category"})
    }
};
