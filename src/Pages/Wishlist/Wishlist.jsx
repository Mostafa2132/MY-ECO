import { useContext, useEffect } from "react";
import { wishlistProvider } from "../../Context/WishlistContext/WishlistContext";
import Loading from "../../Components/Loading/Loading";
import WishlistItem from "../../Components/WishlistItem/WishlistItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  let { whiteListProducts, getWishlistProducts } = useContext(wishlistProvider);

  useEffect(() => {
    getWishlistProducts();
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Wishlist page of E-commerce website "
        />
        <meta name="keywords" content="E-commerce, Wishlist, Wishlist page" />
        <meta name="author" content="Mostafa Mohamed Ebrahim" />
        <title> Fresh Cart | Wishlist</title>
      </Helmet>

      <h1 className="text-2xl font-semibold text-sky-900 py-7">
        Your Wishlist{" "}
        <span>
          <i className="fa-solid fa-heart text-2xl text-sky-400"></i>
        </span>
      </h1>

      {whiteListProducts?.data ? (
        whiteListProducts.data.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {whiteListProducts.data.map((product) => (
              <WishlistItem key={product.id} productInfo={product} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-sky-50 p-5 mt-5 rounded-2xl">
            <h1 className="text-2xl font-bold mt-5 text-sky-600 mb-6">
              Your Wishlist is Empty{" "}
              <span>
                <i className="fa-solid fa-face-sad-tear"></i>
              </span>{" "}
              Add Items to your Wishlist and Be right back to your Cart
            </h1>
            <Link
              to="/"
              className="hover:scale-110 mb-2 md:mb-0 bg-sky-600 cursor-pointer shadow text-white p-2 bottom-4 rounded-lg hover:bg-sky-700 transition-all duration-500"
            >
              Home
            </Link>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
