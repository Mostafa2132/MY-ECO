/* eslint-disable react/prop-types */
import { useContext } from "react";
import { cartContextProvider } from "../../Context/CartContext/CartContext";

export default function CartItem({ productInfo }) {
  let { deleteCartProduct ,updateCartProduct } = useContext(cartContextProvider);

  let { count, price, product } = productInfo;
  let { imageCover, category, quantity, ratingsAverage, title, id } = product;



  return (
    <>
      <div className="bg-white border max-w-[64rem] mx-auto mt-6  border-sky-900 shadow-lg sadow-sky-900/30  rounded-xl  sm:flex dark:bg-neutral-900 ">
        <div className="shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[12%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-sm">
          <div className="img h-40 w-full  ">
            <img
              className="size-full absolute p-5 top-0 start-0 w-full h-full object-contain"
              src={imageCover}
              loading="lazy"
              alt="Card Image"
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full relative ">
          <div className="p-4 flex flex-col w-full   sm:p-7">
            <h3 className="text-lg font-bold text-sky-500 dark:text-white">
              Title :<span className="text-gray-500 ">{title}</span>
            </h3>
            <p className="mt-3 font-bold text-sky-500 dark:text-neutral-400">
              category :<span className="text-gray-500 "> {category.name}</span>
            </p>
            <p className="mt-3 text-sky-500 dark:text-neutral-400 font-bold">
              quantity :<span className="text-gray-500 ">{quantity}</span>
            </p>
            <div className="flex items-center mb-14 md:mb-0 justify-between mt-4">
              <span className="text-md font-bold text-green-600">
                price :<span className="text-gray-500 ">{price}</span>
                <span className="text-[12px] text-sky-500"> EGY</span>
              </span>
              <span className="text-md font-bold text-gray-800 dark:text-white">
                {ratingsAverage}
                <i className="fa-solid text-yellow-500 fa-star ms-2"></i>
              </span>
            </div>
          </div>



          <div className="item_method ms-7 mb-6 md:mb-1 flex items-center gap-6">

            <div onClick={() => updateCartProduct({id:id,count:count+1})} className="plus size-8 border-2 border-green-500 dark:text-white cursor-pointer rounded-full flex items-center justify-center">
              <i className="fa fa-plus"></i>
            </div>
            <h2 className="text-xl font-medium text-sky-500 dark:text-white">
              {count}
            </h2>
            <div onClick={() => updateCartProduct({id:id,count:count-1})}  className="plus size-8 border-2 border-red-500 dark:text-white cursor-pointer rounded-full flex items-center justify-center">
              <i className="fa fa-minus"></i>
            </div>
          </div>
          <button
            onClick={() => deleteCartProduct({id:id})}
            className="absolute group hover:scale-110  mb-2 md:mb-0   bg-red-600 cursor-pointer shadow text-white p-2 bottom-4 rounded-lg hover:bg-red-700 transition-all duration-500 right-6"
          >
            <i className="fa-solid group-hover:animate-pulse text-sm mx-1 fa-trash"></i> Delete Product
          </button>
        </div>
      </div>
    </>
  );
}
