import logo from "../../assets/images/logo.svg";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { userContextProvider } from "../../Context/userContext/userContext";
import { cartContextProvider } from "../../Context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const navigate = useNavigate();
  let [isCashLoading, setIsCashLoading] = useState(false);
  let [isCardLoading, setIsCardLoading] = useState(false);
  let [cash, setCash] = useState(false);
  let { token } = useContext(userContextProvider);
  let { cartProducts } = useContext(cartContextProvider);

  // cash order
  async function cashOrder(values) {
    let toastId = toast.loading("Placing order...");
    setIsCashLoading(true);
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartProducts.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Order placed successfully");
        setIsCashLoading(false);
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      setIsCashLoading(false);
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // card order
  async function cardOrder(values) {
    const toastId = toast.loading("Placing order...");
    setIsCardLoading(true);
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartProducts.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);

      if (data.status === "success") {
        toast.loading("Going to stripe...");
        setIsCardLoading(false);
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      setIsCardLoading(false);
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (cash == true) {
        cashOrder(values);
      } else {
        cardOrder(values);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title> Fresh Cart | Checkout</title>
        <meta
          name="description"
          content="Checkout page of E-commerce website "
        />
        <meta
          name="keywords"
          content="E-commerce, Checkout, checkout, checkout page"
        />
        <meta name="author" content="Mostafa Mohamed Ebrahim" />
      </Helmet>

      <div className="mt-7 max-w-[28rem] mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 shadow-lg shadow-sky-900 rounded-xl sm:p-7">
          <div className="text-center ">
            <img src={logo} className="w-40 mx-auto mb-5" alt="" />
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Complete your purchase
            </h1>
          </div>
          <div className="mt-5">
            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    Your City
                  </label>
                  {/* ? emailInput  */}
                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="shippingAddress.city"
                      value={formik.values.shippingAddress.city}
                      onChange={formik.handleChange}
                      className="py-3 px-4 block w-full outline-2 dark:text-white outline-sky-800 rounded-lg text-sm"
                      required=""
                      aria-describedby="email-error"
                    />

                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    Your Phone Number
                  </label>
                  {/* ? emailInput  */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="email"
                      name="shippingAddress.phone"
                      value={formik.values.shippingAddress.phone}
                      onChange={formik.handleChange}
                      className="py-3 px-4 block w-full outline-2 dark:text-white outline-sky-800 rounded-lg text-sm"
                      required=""
                      aria-describedby="email-error"
                    />

                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    Your Details
                  </label>
                  <div className="relative">
                    <textarea
                      id="password"
                      name="shippingAddress.details"
                      value={formik.values.shippingAddress.details}
                      onChange={formik.handleChange}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm outline-2 dark:text-white outline-sky-800"
                      required=""
                      aria-describedby="password-error"
                    />
                  </div>
                </div>

                <div className="pay flex items-center justify-between gap-4">
                  <button
                    onClick={() => setCash(true)}
                    type="submit"
                    className="w-full py-3 cursor-pointer px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:outline-none  disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isCashLoading && (
                      <i className="fa-solid fa-spinner animate-spin"></i>
                    )}{" "}
                    Pay Cash
                  </button>
                  <button
                    type="submit"
                    className="w-full py-3 cursor-pointer px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-700 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isCardLoading && (
                      <i className="fa-solid fa-spinner animate-spin"></i>
                    )}{" "}
                    Pay Card
                  </button>
                </div>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </>
  );
}
