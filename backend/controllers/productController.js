import {v2 as cloudinary} from "cloudinary"
import productModel  from "../models/productModel.js"
// Controller for handling products(add product feature)

const addProduct = async (req, res) => {
    try {
      const { brand, name, description, price, category, subCategory, sizes, bestseller } = req.body;
      const image1 = req.files.image1 && req.files.image1[0] 
      const image2 = req.files.image2 && req.files.image2[0] 
      const image3 = req.files.image3 && req.files.image3[0] 
      const image4 = req.files.image4 && req.files.image4[0] 
      

      const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

      let imagesUrl = await Promise.all(
        images.map(async (item)=>{
          let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
          return result.secure_url
        })
      )

const productData = {
        brand,
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === "true" ? true : false,
        sizes,
        image : imagesUrl,
        date:Date.now()


}

    console.log(productData);


    const product = new productModel(productData);
     await product.save()

  
      res.json({ success: true, message: 'Product added successfully' });
  
    } catch (error) {
      console.log(error);
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
    
// Controller for listing products

  
  const removeProduct = async (req, res) => {
    // Implement removal logic

    try {
    await  productModel.findByIdAndDelete(req.body.id)
    res.json({sucess:true,message:"Product Removed"})
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  const singleProduct = async (req, res) => {
    // Implement single product retrieval logic
    try {
      const { productId } = req.body; // Get productId from URL parameters
      const product = await productModel.findById(productId); // Fetch product by ID
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" }); // Handle product not found
      }
  
      res.json({ success: true, product }); // Send the product data in response
    } catch (error) {
      console.error("Error fetching product:", error); // Log any errors
      res.status(500).json({ success: false, message: error.message }); // Handle server error
    }
  };
  
  export { listProduct, addProduct, removeProduct, singleProduct };
  