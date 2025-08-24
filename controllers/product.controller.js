import Product from "../models/product.modal.js";
import { v2 as cloudinary } from "cloudinary";

// Add Product :  api/product/add

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, offerPrice, category } = req.body;
        const image = req.files?.map((file) => file.filename);

        // const images = req.files;
        // let imgUrl = await Promise.all(
        //     images.map(async (item) => {
        //         let result = await cloudinary.uploader.upload(item.path, {
        //             resource_type: "image"
        //         })
        //         return result.secure_url;
        //     })
        // )

        if (!name || !description || !price || !offerPrice || !category || !image || image.length === 0) {
            res.status(400).json({
                message: "All fields including images are required",
                success: false
            })
        }

        await Product.create({
            name,
            description,
            price,
            offerPrice,
            category,
            image
        })
        res.status(201).json({
            message: "Product added successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}


// Get All Products :  api/product/get

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// Get Product by Id :  api/product/id

export const getProductById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        } else {
            res.status(200).json({
                success: true,
                product
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// Change Product Stock :  api/product/stock

export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        const product = await Product.findByIdAndUpdate(id, { inStock }, { new: true });
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        } else {
            res.status(200).json({
                success: true,
                product,
                message: "Stock updated successfully"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}