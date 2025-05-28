import  { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setIsLoading(true);
    try {
      // Optimistically remove the product from the UI first
      setList((prevList) => prevList.filter((product) => product._id !== id));

      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product removed successfully!");
      } else {
        toast.error(response.data.message);
        fetchList(); // Rollback the removal if the request fails
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while removing the product.");
      fetchList();
    } finally {
      setIsLoading(false);
      setSelectedProduct(null); // Close the popup
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleConfirmRemove = (product) => {
    setSelectedProduct(product);
  };

  const handleCancelRemove = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <p className="mb-3 text-xl font-semibold">All Products List</p>
      <div className="flex flex-col gap-4">
        {/* Table Header */}
        <div className="grid grid-cols-2 sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border-b-2 bg-gray-100 text-base font-bold">
          <span className="col-span-2 sm:col-auto">Image</span>
          <span className="hidden sm:block">Name</span>
          <span className="hidden sm:block">Category</span>
          <span className="hidden sm:block">Price</span>
          <span className="hidden sm:block text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:grid-cols-[1fr_2fr_3fr_1fr_1fr_1fr] gap-4 sm:gap-0 items-center py-3 px-4 border-b text-base"
          >
            {/* Image */}
            <img
              className="w-24 h-24 object-cover border rounded-md col-span-2 sm:col-auto"
              src={item.image[0]}
              alt={item.name}
            />

            {/* Name */}
            <span className="text-gray-700 col-span-2 sm:col-auto text-lg">
              {item.name}
            </span>

            {/* Category */}
            <span className="text-gray-700 col-span-2 sm:col-auto text-lg">
              {item.category}
            </span>

            {/* Price */}
            <span className="text-gray-700 col-span-2 sm:col-auto text-lg">
              {currency}
              {item.price}
            </span>

            {/* Action */}
            <span
              onClick={() => handleConfirmRemove(item)}
              className="text-center text-black cursor-pointer font-bold col-span-2 sm:col-auto text-lg"
            >
              X
            </span>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center mt-4">
            <p>Loading...</p>
          </div>
        )}

        {/* Confirmation Popup */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md p-6 shadow-lg w-11/12 sm:w-1/3">
              <p className="text-lg font-semibold mb-4">
                Do you want to remove this product?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCancelRemove}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  No
                </button>
                <button
                  onClick={() => removeProduct(selectedProduct._id)}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-red-600"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
