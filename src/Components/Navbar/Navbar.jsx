import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useContext, useEffect, useState } from "react";
import { userContextProvider } from "../../Context/UserContext/UserContext";
import { cartContextProvider } from "../../Context/CartContext/CartContext";
import { wishlistProvider } from "../../Context/WishlistContext/WishlistContext";

export default function Navbar() {
  let { token, logout } = useContext(userContextProvider);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  let { cartProducts, getCartProducts } = useContext(cartContextProvider);
  let { whiteListProducts, getWishlistProducts } = useContext(wishlistProvider);

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    getWishlistProducts();
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 shadow-lg shadow-sky-900/30 dark:shadow-sky-900  z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-sky-800 text-sm py-3 dark:bg-sky-800 ">
        <nav className="max-w-[85rem] w-full  mx-auto px-4 md:flex md:items-center md:justify-between">
          <div className="flex items-center  justify-between">
            <Link
              className="flex-none text-xl font-bold focus:outline-none focus:opacity-80"
              to="/"
              aria-label="Brand"
            >
              <img src={logo} alt="Brand Logo" />
            </Link>
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-w-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:hover:bg-white/10 dark:focus:bg-white/10"
                id="hs-navbar-example-collapse"
                aria-expanded={isOpen}
                aria-controls="hs-navbar-example"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-example"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className={`${isOpen ? "hidden" : "block"} shrink-0 size-4`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} shrink-0 size-4`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>
          </div>
          <div
            id="hs-navbar-example"
            className={` transition-all duration-500 ${
              isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } md:max-h-full md:opacity-100 md:block`}
          >
            <div className="flex flex-col md:py-2 gap-4 mt-5 md:flex-row md:items-center md:mt-0 md:gap-6">
              {/* Navbar Links */}

              {token && (
                <ul className="flex flex-col me-16   gap-4   max-w-min md:flex-row md:gap-6">
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `font-medium relative   focus:outline-none  hover:before:w-full  hover:before:transition-all hover:before:duration-500 before:absolute  before:left-0 before:bg-sky-500 before:h-0.5 before:w-0 before:-bottom-2  ${
                          isActive
                            ? "before:!w-full bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text   text-transparent  font-extrabold"
                            : ""
                        }`;
                      }}
                      to="/"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `font-medium relative  focus:outline-none  hover:before:w-full hover:before:transition-all hover:before:duration-500 before:absolute   before:bg-sky-500 before:h-0.5 before:w-0 before:-bottom-2  ${
                          isActive
                            ? "before:!w-full font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text   text-transparent"
                            : ""
                        }`;
                      }}
                      to="/products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `font-medium relative  focus:outline-none  hover:before:w-full hover:before:transition-all hover:before:duration-500 before:absolute   before:bg-sky-500 before:h-0.5 before:w-0 before:-bottom-2  ${
                          isActive
                            ? "before:!w-full font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text   text-transparent"
                            : ""
                        }`;
                      }}
                      to="/categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `font-medium relative  focus:outline-none  hover:before:w-full hover:before:transition-[width] hover:before:duration-500 before:absolute  before:left-0 before:bg-sky-500 before:h-0.5 before:w-0 before:-bottom-2  ${
                          isActive
                            ? "before:!w-full  font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text   text-transparent"
                            : ""
                        }`;
                      }}
                      to="/brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `font-medium relative  focus:outline-none  hover:before:w-full hover:before:transition-[width] hover:before:duration-500 before:absolute  before:left-0 before:bg-sky-500 before:h-0.5 before:w-0 before:-bottom-2  ${
                          isActive
                            ? "before:!w-full  font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text   text-transparent"
                            : ""
                        }`;
                      }}
                      to="/allorders"
                    >
                      Orders
                    </NavLink>
                  </li>
                </ul>
              )}

              {/* Social Links */}
              {token && (
                <ul className="flex  gap-4   sm:flex-row sm:gap-6">
                  {/* wishlist  */}
                  <div className="relative">
                    <Link
                      to="/wishlist"
                      className="fa-regular fa-heart cursor-pointer text-2xl text-sky-500"
                    ></Link>
                    <span
                      className="absolute size-4 rounded-full bg-sky-950 text-white flex justify-center items-center 
  -top-2 -right-2 sm:-top-2 sm:-right-2 md:-top-3 md:-right-3 lg:-top-3 lg:-right-3"
                    >
                      {whiteListProducts?.count !== undefined ? (
                        whiteListProducts.count
                      ) : (
                        <i className="fa-solid p-2 text-sky-500  text-[12px] fa-spin fa-spinner"></i>
                      )}
                    </span>
                  </div>

                  {/* cart */}
                  <div className="relative">
                    <Link
                      to="/cart"
                      className="fa-solid fa-cart-shopping cursor-pointer text-2xl text-sky-500"
                    ></Link>
                    <span
                      className="absolute size-4 rounded-full bg-sky-950 text-white flex justify-center items-center 
  -top-2 -right-2 sm:-top-2 sm:-right-2 md:-top-3 md:-right-3 lg:-top-3 lg:-right-3"
                    >
                      {cartProducts?.numOfCartItems !== undefined ? (
                        cartProducts?.numOfCartItems
                      ) : (
                        <i className="fa-solid p-2 text-sky-500  text-[12px] fa-spin fa-spinner"></i>
                      )}
                    </span>
                  </div>
                  <li>
                    <i className="fa-brands text-2xl cursor-pointer text-blue-500 fa-facebook"></i>
                  </li>
                  <li>
                    <i className="fa-brands text-2xl cursor-pointer text-blue-500 fa-twitter"></i>
                  </li>
                  <li>
                    <i className="fa-brands text-2xl cursor-pointer text-pink-500 fa-instagram"></i>
                  </li>
                  <li>
                    <i className="fa-brands text-2xl cursor-pointer text-blue-500 fa-linkedin"></i>
                  </li>
                  <li>
                    <i className="fa-brands text-2xl cursor-pointer text-red-600 fa-youtube"></i>
                  </li>
                </ul>
              )}

              {/* Dark Mode Toggle */}

              <div className="flex  flex-wrap gap-4">
                {/* زر تفعيل الوضع الداكن */}
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-x-2 py-2 px-3 rounded-full text-sm font-semibold text-sky-500 dark:hidden"
                  onClick={() => {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                  }}
                >
                  <svg
                    className="w-6 h-6 stroke-current text-sky-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                </button>

                {/* زر تفعيل الوضع الفاتح */}
                <button
                  type="button"
                  className="hidden cursor-pointer dark:inline-flex  dark:bg-red-800 dark:rounded-full items-center gap-x-2 py-2 px-3  text-sm font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent hover:bg-sky-400 focus:outline-none"
                  onClick={() => {
                    document.documentElement.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                  }}
                >
                  <svg
                    className="w-6 h-6 stroke-current text-gray-800  dark:text-sky-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                </button>
              </div>

              {/* Dark Mode Toggle */}

              {/* login and logout */}

              {!token && (
                <ul className="flex  gap-4  sm:flex-row sm:gap-6">
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `font-medium relative  focus:outline-none  hover:before:w-full hover:before:transition-all hover:before:duration-500 before:absolute   before:bg-sky-500 before:h-0.5 before:w-0 before:-bottom-2  ${
                          isActive
                            ? "before:!w-full font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text   text-transparent"
                            : ""
                        }`;
                      }}
                      to="/login"
                    >
                      Log in
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `font-medium relative  focus:outline-none  hover:before:w-full hover:before:transition-all hover:before:duration-500 before:absolute  before:left-0 before:bg-sky-500 before:h-0.5 before:w-0 before:-bottom-2  ${
                          isActive
                            ? "before:!w-full font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text   text-transparent"
                            : ""
                        }`;
                      }}
                      to="/signup"
                    >
                      Sign up
                    </NavLink>
                  </li>
                </ul>
              )}

              {token && (
                <div className="relative   z-[100] inline-flex">
                  <button
                    id="hs-dropdown-account"
                    type="button"
                    onClick={() => setIsOpen2(!isOpen2)}
                    className="size-[38px] inline-flex cursor-pointer justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white"
                    aria-haspopup="menu"
                    aria-expanded={isOpen2}
                    aria-label="Dropdown"
                  >
                    <img
                      className="shrink-0 size-[38px]  rounded-full"
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="User Avatar"
                      loading="lazy"
                    />
                  </button>

                  {isOpen2 && (
                    <div
                      className="absolute md:right-0 md:top-4  min-w-60 mt-10 md:mt-7 bg-white shadow-md rounded-lg dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="hs-dropdown-account"
                    >
                      <div className="py-3 px-5 bg-gray-100  rounded-t-lg dark:bg-neutral-700">
                        <p className="text-sm text-gray-500 dark:text-neutral-500">
                          Signed in as
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                          {localStorage.getItem("userEmail")}
                        </p>
                      </div>
                      <div className="p-1.5 space-y-0.5">
                        <p
                          className="flex items-center  py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                          href="#"
                        >
                          Ahllan
                          <span className="text-sky-500 ms-2 me-3 font-semibold ">
                            {localStorage.getItem("userName")}{" "}
                          </span>
                          👋
                        </p>

                        <Link
                          className="flex items-center  py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-sky-200 cursor-pointer focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-sky-700 dark:hover:text-neutral-300"
                          to="/updateInfo"
                        >
                          Update Your Information
                          <span className="text-sky-500 ms-2 me-3 font-semibold "></span>
                          🔄
                        </Link>

                        <p
                          onClick={logout}
                          className="flex cursor-pointer items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-red-700 hover:text-white focus:outline-none focus:bg-gray-100 dark:text-neutral-400  "
                        >
                          Log out{" "}
                          <span>
                            <i className="fa-solid fa-person-walking-arrow-right"></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
