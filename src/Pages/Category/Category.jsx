import Marquee from "react-fast-marquee";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";

export default function Category() {
  let { data, isLoading } = useCategory();

  return (
    <>
      <Helmet>
        <title> Fresh Cart |Categories</title>
        <meta
          name="description"
          content="Categories page of E-commerce website "
        />
        <meta
          name="keywords"
          content="E-commerce, Categories, Categories page"
        />
        <meta name="author" content="Mostafa Mohamed Ebrahim" />
      </Helmet>
      <>
        {/* Card Blog */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Title */}
          <div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
              Read our latest news
            </h2>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
              We've helped some great companies brand, design and get to market.
            </p>
          </div>

          {isLoading && <Loading />}

          <Marquee speed={50}>
            {data?.data?.data?.map((category) => (
              <Link
                to={`/relatedCategoryProducts/${category._id}`}
                key={category._id}
                className="group flex flex-col w-64 bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800 mx-2"
              >
                <div className="h-56 ">
                  <img
                    className="w-full h-full object-contain rounded-t-xl"
                    src={category.image}
                    alt="Blog Image"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase text-sky-600 ">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </Marquee>

          <div className="text-center mt-8">
            <div className="inline-block bg-white border shadow-sm rounded-full dark:bg-neutral-900 dark:border-neutral-800">
              <div className="py-3 px-4 flex items-center gap-x-2">
                <p className="text-gray-600 dark:text-neutral-400">
                  Want to see our products
                </p>
                <Link
                  className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                  to="/"
                >
                  Go here
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* End Card */}
        </div>
        {/* End Card Blog */}
      </>
    </>
  );
}
