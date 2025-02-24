import { useContext } from "react";
import { cartContextProvider } from "../../Context/CartContext/CartContext";
import { wishlistProvider } from "../../Context/WishlistContext/WishlistContext";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function WishlistItem({ productInfo }) {
  const { addProductToCart } = useContext(cartContextProvider);
let {removeProductFromWishlist} = useContext(wishlistProvider);

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
<div className="flex flex-col isolate group bg-white border border-sky-900 shadow-lg shadow-sky-900/30 dark:shadow-sky-900 rounded-xl dark:bg-neutral-900">
  <div className="relative">
    <img
      className="w-full h-auto rounded-t-xl"
      src={imageCover}
      loading="lazy"
      alt={title}
    />
    {/* ✅ التأثيرات تشتغل لما نهوفر على الكارد كله */}
    <div className="layer gap-5 absolute inset-0 rounded-t-xl flex items-center justify-center overflow-hidden bg-sky-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      <span  onClick={() => addProductToCart({ productId: _id })} className="w-8 hover:rotate-[25deg] cursor-pointer translate-y-8 group-hover:translate-y-0 transition delay-100 duration-500 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center">
        <i className="fa-solid fa-cart-shopping"></i>
      </span>
      <Link to={`/productDetails/${_id}/${category._id}`} className="w-8 hover:rotate-[20deg] cursor-pointer translate-y-10 group-hover:translate-y-0 transition delay-200 duration-500 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center">
        <i className="fa-regular fa-eye"></i>
      </Link>
    </div>
  </div>

  <div className="p-4 md:p-5 overflow-hidden relative z-30">
    <div className="flex items-center justify-between pt-6">
      <h3 className="text-lg font-bold line-clamp-1 text-sky-800">
        {title.split(' ').slice(0, 3).join(' ')}
      </h3>

      {/* ✅ مجموعة خاصة بالقلب فقط عشان التولتيب */}
      <div className="relative isolate group/wishlist">
        <span
          onClick={() => removeProductFromWishlist({ productId: _id })}
          className="fa-solid hover:animate-bounce fa-heart-crack text-sky-500 text-2xl cursor-pointer"
        ></span>

        {/* ✅ التولتيب يظهر فوق كل حاجة (بما فيها الصورة) */}
        <span className="absolute left-1/2 -translate-x-[80%] bottom-full mb-2 w-max px-3 py-2 text-xs text-white bg-sky-700 rounded shadow-lg z-[9999]  
          opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover/wishlist:opacity-100 group-hover/wishlist:translate-y-0 pointer-events-none">
          Remove from Wishlist
        </span>    
      </div>
    </div>

    <h4 className="text-lg font-bold text-gray-800 dark:text-white">{category.name}</h4>
    <p className="mt-1 line-clamp-2 text-gray-500 dark:text-neutral-400">{description}</p>

    <div className="flex items-center justify-between mt-4">
      <span className="text-md font-bold text-gray-800 dark:text-white">
        {price} <span className="text-[12px] text-sky-500">EGY</span>
      </span>
      <span className="text-md font-bold text-gray-800 dark:text-white">
        {ratingsAverage} <i className="fa-solid text-yellow-500 fa-star"></i>
      </span>
    </div>

    {/* ✅ الزر يتحرك لما نهوفر على الكارد كله */}
    <button
      onClick={() => addProductToCart({ productId: _id })}
      type="button"
      className="mt-4 hover:scale-110 hover:bg-sky-400 cursor-pointer w-full bg-sky-900 text-white py-2 rounded-md translate-y-[150%] group-hover:translate-y-0 transition duration-500"
    >
      Add to Cart
    </button>
  </div>
</div>


    </>
  );
}
