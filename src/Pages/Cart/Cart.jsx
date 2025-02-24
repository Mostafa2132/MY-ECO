import { useContext, useEffect } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import { cartContextProvider } from "../../Context/CartContext/CartContext";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getCartProducts, cartProducts, clearCart  } =
    useContext(cartContextProvider);
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
<Helmet>
<title> Fresh Cart | Cart</title>
<meta name="description" content="Cart page of E-commerce website " />
<meta name="keywords" content="E-commerce, Cart, Cart page" />
<meta name="author" content="Mostafa Mohamed Ebrahim" />
</Helmet>
<div className="cart">
  <div className="cart_header mt-5 flex items-center">
    <i className="fa-brands fa-2x me-2 text-sky-900 fa-opencart"></i>
    <h1 className="text-2xl font-semibold text-sky-900">
      <span className="px-2 text-sky-600">|</span> Welcome to Your Cart
    </h1>
  </div>

  {!cartProducts?.data ? (
    <Loading />
  ) : cartProducts.data.products.length === 0 ? (
    <div className="text-center bg-sky-50 p-5 mt-5 rounded-2xl">
      <h1 className="text-2xl font-bold mt-5 text-sky-600 mb-6">
        Your Cart is Empty{" "}
        <span>
          <i className="fa-solid fa-face-sad-tear"></i>
        </span>{" "}
        Add Items to your Cart and Be right back to your Cart
      </h1>
      <Link
        to="/"
        className="hover:scale-110 mb-2 md:mb-0 bg-sky-600 cursor-pointer shadow text-white p-2 bottom-4 rounded-lg hover:bg-sky-700 transition-all duration-500"
      >
        Home
      </Link>
    </div>
  ) : (
    <>
      {cartProducts.data.products.map((product) => (
        <CartItem key={product._id} productInfo={product} />
      ))}

      <div className="flex justify-between items-center mt-5">
        <h1 className="text-2xl text-sky-500 mt-8 font-semibold">
          <span>
            <i className="fa-solid fa-sack-dollar text-green-600"></i>
          </span>{" "}
          Total Price:{" "}
          <span className="text-2xl text-green-500 font-semibold">
            {cartProducts.data.totalCartPrice}
          </span>{" "}
          L.E{" "}
        </h1>
        <button
          onClick={() => clearCart()}
          className="hover:scale-110 group mb-2 md:mb-0 bg-red-600 cursor-pointer shadow text-white p-2 bottom-4 rounded-lg hover:bg-red-700 transition-all duration-500"
        >
          <i className="fa-solid text-sm mx-1 group-hover:animate-pulse fa-trash"></i> Clear Cart
        </button>
      </div>
       <Link
          to="/checkout"
       
          className=" mt-5 block   size-fit ms-auto group mb-2 md:mb-0 bg-green-600 cursor-pointer shadow text-white p-2 rounded-lg hover:bg-green-700 transition-all duration-500"
        >
           Next Step <i className="fa-solid text-sm mx-1 group-hover:animate-bounce fa-arrow-right"></i>
        </Link>
    </>
  )}
</div>
    </>
  );
}
