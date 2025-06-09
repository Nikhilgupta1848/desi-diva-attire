import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Controller for adding a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (!name || !description || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Retrieve uploaded files from req.files
    const images = [
      req.files.image1?.[0],
      req.files.image2?.[0],
      req.files.image3?.[0],
      req.files.image4?.[0],
    ].filter(Boolean);

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(
        (file) =>
          new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );
            uploadStream.end(file.buffer); // Use buffer from memory storage
          })
      )
    );

    // Prepare product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: Array.isArray(sizes) ? sizes : sizes.split(","),
      image: imagesUrl,
      date: Date.now(),
    };

    // Save product to database
    const product = new productModel(productData);
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for listing all products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for removing a product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for fetching a single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
