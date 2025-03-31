import Product from "../models/product.model.js";

export const addProduct = async(req ,res ) =>{
    try {
        const { name, description, price, category, quantity, brand } = req.fields;
        
        // validation
        switch (true) {
            case !name:
                return res.json({ message:"Name is required"})
            case !description:
                return res.json({ message:"description is required"})
            case !price:
                return res.json({ message:"price is required"})
            case !category:
                return res.json({ message:"category is required"})
            case !quantity:
                 return res.json({ message:"quantity is required"})
            case !brand:
                return res.json({ message:"brand is required"})

        }
        const product = new Product({ ...req.fields })
        await product.save()
        res.json(product)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error in adding product"})
    }
}