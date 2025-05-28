import  { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]); // Array to hold images
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation before submission
    if (sizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }

    setIsSubmitting(true);
    toast.info("Adding product...");

    try {
      const formData = new FormData();

      // Append form data
      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      sizes.forEach((size) => formData.append("sizes[]", size)); // Send sizes as an array

      // Append images only if they exist
      images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      // API call
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      // Handle response
      if (response.data.success) {
        resetForm();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during API request:", error);
      toast.error("An error occurred, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    
    setName("");
    setDescription("");
    setPrice("");
    setCategory("Women");
    setSubCategory("Saree");
    setBestseller(false);
    setSizes([]);
    setImages([null, null, null, null]); // Reset images
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-3 text-xl font-semibold">Upload Image</p>
        <div className="flex gap-2">
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt={`Upload Area ${index + 1}`}
              />
              <input
                onChange={(e) => handleImageChange(e, index)}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-3">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-3">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-3">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Women">Women</option>
            <option value="Kids">Kids-Girl</option>
          </select>
        </div>

        <div>
          <p className="mb-3">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Saree">Saree</option>
            <option value="Suit">Suit</option>
            <option value="Dress">Dress</option>
            <option value="Kurti Top">Kurti Top</option>
            <option value="Lehenga">Lehenga</option>
            <option value="Gown">Gown</option>
            <option value="Tops">Tops</option>
            <option value="Bottom Wear">Bottom Wear</option>
          </select>
        </div>

        <div>
          <p className="mb-3">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="00"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-3">Product Sizes</p>
        <div className="flex gap-3">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-300" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button
        className="w-28 py-3 mt-4 bg-black text-white"
        type="submit"
        disabled={isSubmitting} // Disable button while submitting
      >
        {isSubmitting ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
