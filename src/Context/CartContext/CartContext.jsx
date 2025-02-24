
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContextProvider } from "../UserContext/UserContext";
import toast from "react-hot-toast";
export const cartContextProvider = createContext(null);
export default function CartContext({ children }) {
  const { token } = useContext(userContextProvider);
  let [cartProducts, setCartProducts] = useState(null); // [C]
  //! add product to cart
  async function addProductToCart({ productId }) {
    const toastId = toast.loading(`Adding product to cart...`);
    try {
      let options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  //* get cart products
  async function getCartProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCartProduct({ id }) {
    const toastId = toast.loading(`Deleting product from cart...`, {
      style: {
        border: "1px solid #B91C1C",
        padding: "16px",
        color: "#fff",
        backgroundColor: "#B91C1C",
      },
    });
    try {
      let options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product deleted successfully");
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  //! clear cart
  async function clearCart() {
    const toastId = toast.loading(`Clearing cart...`, {
      style: {
        border: "1px solid #B91C1C",
        padding: "16px",
        color: "#fff",
        backgroundColor: "#B91C1C",
      },
    });
    try {
      let options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Cart cleared successfully");
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  //& updata cart product

  async function updateCartProduct({ count, id }) {
    const toastId = toast.loading(`Updating product...`);
    try {
      let options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(`Product updated successfully`);
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <cartContextProvider.Provider
      value={{
        addProductToCart,
        getCartProducts,
        cartProducts,
        deleteCartProduct,
        clearCart,
        updateCartProduct,
      }}
    >
      {children}
    </cartContextProvider.Provider>
  );
}
