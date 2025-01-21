import { v2 as cloudinary } from 'cloudinary';

const addProduct = async (req, res) => {
  try {
    const { brand, name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const images = req.files; // Access uploaded files from memory
    const imagesUrl = await Promise.all(
      Object.values(images).flat().map(async (file) => {
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) throw new Error(error.message);
            return result.secure_url;
          }
        ).end(file.buffer);
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
      bestseller: bestseller === 'true',
      sizes,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.json({ success: false, message: error.message });
  }
};
