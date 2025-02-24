import { useContext, useState } from "react";
import { cartContextProvider } from "../../Context/CartContext/CartContext";
import { wishlistProvider } from "../../Context/WishlistContext/WishlistContext";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Card({ productInfo }) {
  const { addProductToCart } = useContext(cartContextProvider);
  const { addProductToWishlist , removeProductFromWishlist } = useContext(wishlistProvider);

  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeProductFromWishlist({ productId: _id });
    } else {
      addProductToWishlist({ productId: _id });
    }
    setIsWishlisted(!isWishlisted);
  };

  let {
    _id,
    title,
    description,
    imageCover,
    category,
    price,
    ratingsAverage,
    id,
  } = productInfo;

  return (
    <>
      <div className="flex flex-col group/icon group bg-white border border-sky-900 shadow-lg shadow-sky-900/30 dark:shadow-sky-900  rounded-xl dark:bg-neutral-900 ">
        <div className="relative    overflow-hidden">
          <img
            className="w-full h-auto rounded-t-xl"
            src={imageCover}
            loading="lazy"
            alt={title}
          />
          <div className="layer  gap-5 absolute inset-0 rounded-t-xl flex items-center justify-center overflow-hidden bg-sky-950/75 opacity-0 group-hover:opacity-100  transition-opacity duration-300 ">
            <span
              onClick={() => addProductToWishlist({ productId: _id })}
              className="w-8 hover:rotate-[20deg]   cursor-pointer translate-y-5 group-hover/icon:translate-y-0 transition duration-500 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center"
            >
              <i className="fa-regular fa-heart"></i>
            </span>
            <span className="w-8 hover:rotate-[25deg]  cursor-pointer translate-y-8 group-hover/icon:translate-y-0 transition delay-100 duration-500 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center">
              <i className="fa-solid fa-cart-shopping"></i>
            </span>
            <Link to={`/productDetails/${_id}/${category._id}`} className="w-8 hover:rotate-[20deg]  cursor-pointer translate-y-10 group-hover/icon:translate-y-0 transition delay-200  duration-500 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center">
              <i className="fa-regular fa-eye"></i>
            </Link>
          </div>

          {price > 300 && (
            <div className="sale flex items-center justify-center size-12 p-4 absolute top-2 right-2 rounded-full bg-gradient-to-r from-gray-800 via-blue-700 to-sky-600
  text-white py-1 px-2">
              <p className="text-[12px] text-white font-semibold">
                sale <br></br>10%{" "}
              </p>
            </div>
          )}
        </div>
        <div className="p-4 md:p-5 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-lg  font-bold line-clamp-1 text-sky-800 ">
              {title}
            </h3>

            <i
              onClick={toggleWishlist}
              className={`fa-heart text-xl cursor-pointer ${
                isWishlisted
                  ? "fa-solid text-red-500"
                  : "fa-regular text-sky-500"
              }`}
            ></i>
          </div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white">
            {category.name}
          </h4>
          <p className="mt-1 line-clamp-2 text-gray-500 dark:text-neutral-400">
            {description}
          </p>

          <div className="flex items-center justify-between mt-4">
            {price > 250 ? (
              <span className="text-md  font-bold text-gray-800 dark:text-white">
                <del className="text-[11px] ">{price}</del> {price - (price * 10) / 100} <span className="text-[12px]  text-sky-500">EGY</span>
              </span>
            ) : (
              <span className="text-md  font-bold text-gray-800 dark:text-white">
                {price} <span className="text-[12px]  text-sky-500">EGY</span>
              </span>
            )}

  
            <span className="text-md font-bold text-gray-800 dark:text-white">
              {ratingsAverage}{" "}
              <i className="fa-solid text-yellow-500 fa-star"></i>
            </span>
          </div>
          <button
            onClick={() => addProductToCart({ productId: _id })}
            type="button"
            className="mt-4 hover:scale-110  hover:bg-sky-400   cursor-pointer w-full bg-sky-900 text-white py-2 rounded-md translate-y-[150%] group-hover:d-block group-hover/icon:translate-y-0 transition duration-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
