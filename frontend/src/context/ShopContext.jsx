import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Fetches the product data
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetches the cart data for the logged-in user
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        { userId: localStorage.getItem("userId") },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Adds an item to the cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        await getUserCart(token); // Synchronize cart
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Updates the quantity of an item in the cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
        await getUserCart(token); // Synchronize cart
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Calculates the total count of items in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        try {
          totalCount += cartItems[items][size] || 0;
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // Calculates the total amount of the cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const size in cartItems[items]) {
          try {
            totalAmount += itemInfo.price * (cartItems[items][size] || 0);
          } catch (error) {}
        }
      }
    }
    return totalAmount;
  };

  // 💾 Save cart to localStorage when not logged in
  useEffect(() => {
    if (!token) {
      localStorage.setItem("guest_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  // 🔁 Restore guest cart on first load
  useEffect(() => {
    if (!token) {
      const savedCart = localStorage.getItem("guest_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  // 🔀 Merge guest cart to backend after login
  const mergeGuestCart = async (newToken) => {
    const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || {};

    for (const itemId in guestCart) {
      for (const size in guestCart[itemId]) {
        const quantity = guestCart[itemId][size];
        if (quantity > 0) {
          try {
            await axios.post(
              `${backendUrl}/api/cart/add`,
              { itemId, size, quantity },
              { headers: { token: newToken } }
            );
          } catch (err) {
            console.error("Cart merge error", err);
          }
        }
      }
    }

    localStorage.removeItem("guest_cart");
    await getUserCart(newToken); // Refresh backend cart
  };

  // Effect to fetch product data when component mounts
  useEffect(() => {
    getProductData();
  }, []);

  // Effect to fetch user cart when token changes
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    mergeGuestCart, // ✅ Export this to use in login page
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
