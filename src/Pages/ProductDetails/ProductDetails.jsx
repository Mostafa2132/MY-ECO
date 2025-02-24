import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Marquee from "react-fast-marquee";
import Card from "../../Components/Card/Card";
import { cartContextProvider } from "../../Context/CartContext/CartContext";

import ImageGallery from "react-image-gallery";
import { Helmet } from "react-helmet";
import useRelatedProducts from "../../hooks/useRelatedProducts";

export default function ProductDetails() {
  const { id } = useParams();

  let { addProductToCart } = useContext(cartContextProvider);

  const [productDetails, setProductsDetails] = useState(null);

  let { data, isLoading } = useRelatedProducts();

  async function getAsingleProduct() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setProductsDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAsingleProduct();
  }, [id]);

  return (
    <>
      <Helmet>
        <title> Fresh Cart | Product Details</title>
        <meta
          name="description"
          content="Product Details page of E-commerce website "
        />
        <meta
          name="keywords"
          content="E-commerce, Product Details, Product Details page"
        />
        <meta name="author" content="Mostafa Mohamed Ebrahim" />
      </Helmet>

      {productDetails === null ? (
        <Loading />
      ) : (
        <div className="bg-white border max-w-[60rem] mx-auto mt-6  border-sky-900 shadow-lg sadow-sky-900/30  rounded-xl  sm:flex dark:bg-neutral-900 ">
          <div className="shrink-0 relative w-full rounded-t-xl overflow-hidden  sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-sm">
            <div className="img   object-cover  w-full  ">
              <ImageGallery
                lazyLoad
                showPlayButton={false}
                showFullscreenButton={false}
                showThumbnails={false}
                showNav={false}
                showBullets={true}
                items={productDetails.images.map((img) => ({
                  original: img,
                  thumbnail: img,
                }))}
                renderItem={(item) => (
                  <img
                    src={item.original}
                    alt="product"
                    style={{
                      maxHeight: "300px",
                      objectFit: "contain",
                      width: "100%",
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-wrap w-full">
            <div className="p-4 flex flex-col  sm:p-7">
              <h3 className="text-lg font-bold text-sky-500 dark:text-white">
                {productDetails.title}
              </h3>
              <p className="mt-1 text-black font-bold dark:text-neutral-400">
                {productDetails.name}
              </p>
              <p className="mt-1 text-gray-500 dark:text-neutral-400">
                {productDetails.description}
              </p>
              <p className="mt-1 text-sky-500 dark:text-neutral-400 font-bold">
                quantity :{" "}
                <span className="text-gray-500 ">
                  {productDetails.quantity}
                </span>
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-md font-bold text-gray-800 dark:text-white">
                  {productDetails.price}{" "}
                  <span className="text-[12px] text-sky-500">EGY</span>
                </span>
                <span className="text-md font-bold text-gray-800 dark:text-white">
                  {productDetails.ratingsAverage}{" "}
                  <i className="fa-solid text-yellow-500 fa-star"></i>
                </span>
              </div>
              <button
                onClick={() => addProductToCart({ productId: id })}
                className="mt-4 hover:scale-110  hover:bg-sky-400 transition  duration-300 cursor-pointer w-full bg-sky-900 text-white py-2 rounded-md "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mt-8 text-sky-600 mb-6">
        Related Products <i className="fa-solid fa-heart"></i>
      </h1>

      {isLoading && <Loading />}
      <Marquee className="gap-7" speed={50}>
        {data?.data?.data?.map((relatedProduct) => (
          <div key={relatedProduct.id} className="w-[20rem] mx-5">
            <Card productInfo={relatedProduct} />
          </div>
        ))}
      </Marquee>
    </>
  );
}
