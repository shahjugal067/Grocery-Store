import Product from "../models/product.model.js";
import mongoose from "mongoose";

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
        const product = new Product({...req.fields })
        await product.save()
        res.json(product)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error in adding product"})
    }
};

export const updateProductDetails = async(req,res)=>{
    try {
        const { name, description, price, category, quantity, brand } = req.fields;
        
        // validation
        switch (true) {
            case !name:
                return res.json({ message:"Name is  required"});
            case !description:
                return res.json({ message:"description is required"});
            case !price:
                return res.json({ message:"price is required"});
            case !category:
                return res.json({ message:"category is required"});
            case !quantity:
                 return res.json({ message:"quantity is required"});
            case !brand:
                return res.json({ message:"brand is required"});

        }
        const product = await Product.findByIdAndUpdate(req.params.id,
            {...req.fields},
            {new:true});
        await product.save();
        res.json(product)
    } catch (error) {
         console.log(error)
    }
};

export const removeProduct = async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        res.json(product)

    } catch (error) {
        console.log(error)
        res.json({ message: "server in removing product"})
    }
};

export const fetchProducts = async (req, res)=>{
    try {
        const pageSize = 5
        const keyword = req.query.keyword 
        ? { name: { $regex: req.query.keyword, $options: "i" } }
        :{};

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize);

        res.json({ products,
            page:1,
            pages: Math.ceil(count / pageSize),
            hasMore: false,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error in fetching products"})
    }
};


export const fetchAllProducts = async(req,res)=>{
    try {
        const products = await Product.find({}).populate('category')
        .limit(12).sort({ createdAt: -1});

        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server erron in fetching all products"})
    }
};
export const fetchProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (id === "allproducts") {
            // Fetch all products
            const products = await Product.find();
            return res.json(products);
        }
        if(id === 'top'){
            const products = await Product.find()
            return res.json(products)
        }
        if(id === 'new'){
            const products = await Product.find()
            return res.json(products)
        }

        // Ensure id is a valid ObjectId before querying
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        // Fetch a single product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const addProductReview = async (req,res)=>{
    try {
        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id)

        if(product){
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString())
                if(alreadyReviewed){
                    res.status(400).json({ message: "Product already reviewed "})
                }
                const review = {
                    name: req.user.username,
                    rating: Number(rating),
                    comment,
                    user: req.user._id,
                }
                product.reviews.push(review)
                product.numReviews = product.reviews.length

                product.rating = product.reviews.reduce((acc,item)=> item.rating + acc,0) / product.reviews.length

                await product.save()

                res.status(200).json({ message: "Review added "})
        }else{
            res.status(404).json({ message: "Product not found"})
        }

    } catch (error) {
        
    }
};

export const fetchTopProducts = async (req, res ) =>{
    try {
        const products = await Product.find({}).sort({ rating: -1}).limit(4)

        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:" Server error at fetching top products "})
    }
};

export const fetchNewProducts =  async ( req, res) =>{
    try {
        const products  = await Product.find().sort({ createdAt: -1}).limit(4)
    } catch (error) {
        console.log(error)
        res.json({ message:" Server error at fetching new products "})
    }
};