import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Controller for adding a product
const addProduct = async (req, res) => {
  try {
    const { brand, name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Access uploaded files from req.files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // Upload each file buffer to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) throw new Error(error.message);
            return result.secure_url;
          }
        ).end(item.buffer); // Pass file buffer here
        return result;
      })
    );

    const productData = {
      brand,
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes,
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller for listing all products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (!products || products.length === 0) {
      return res.json({ success: false, message: "No products found" });
    }
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.json({ success: false, message: error.message });
  }
};

// Controller for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Controller for retrieving a single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body; // Get productId from request body
    const product = await productModel.findById(productId); // Fetch product by ID

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { listProduct, addProduct, removeProduct, singleProduct };
