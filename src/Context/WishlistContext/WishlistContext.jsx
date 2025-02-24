import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { userContextProvider } from "../userContext/userContext";
import axios from "axios";

export const wishlistProvider = createContext(null);

export default function WishlistContext({ children }) {
  const [whiteListProducts, setWhiteListProducts] = useState(null);

  const { token } = useContext(userContextProvider);
  //* add product to wishlist
  async function addProductToWishlist({ productId }) {
    const toastId = toast.loading(`Adding product to wishlist...`);
    try {
      let options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        getWishlistProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function removeProductFromWishlist({ productId }) {
    const toastId = toast.loading(`Removing product from wishlist...`,{
      style: {
        border: "1px solid #B91C1C",
        padding: "16px",
        color: "#fff",
        backgroundColor: "#B91C1C",
      },
});
    try {
      let options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        getWishlistProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getWishlistProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setWhiteListProducts(data);
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <wishlistProvider.Provider
      value={{
        addProductToWishlist,
        removeProductFromWishlist,
        getWishlistProducts,
        whiteListProducts,
      }}
    >
      {children}
    </wishlistProvider.Provider>
  );
}
