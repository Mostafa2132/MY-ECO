import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContextProvider } from "../../Context/UserContext/UserContext";
import logo from "../../assets/images/logo.svg";
import { Helmet } from "react-helmet";
export default function Signup() {
  let { setToken } = useContext(userContextProvider);
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [isExist, setIsExist] = useState("");
  //! vaildtion schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name Input  is required")
      .min(3, "Name must be at least 3 characters")
      .max(13, "Name must be at most  13 characters"),
    email: Yup.string()
      .required("Email Input  is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password Input  is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    rePassword: Yup.string()
      .required("RePassword Input  is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone Input  is required")
      .matches(
        /^(?:\+20|0020)?(010|011|012|015)\d{8}$/,
        "Phone number is not valid"
      ),
  });

  // ? handel form
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendData,
  });

  // * send data to back end
  async function sendData(formData) {
    let toostId = toast.loading("Loading...");
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        formData
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        setToken(data.token);
        toast.success("Successfully created!");
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          border: "1px solid #B91C1C",
          padding: "16px",
          color: "#fff",
          backgroundColor: "#B91C1C",
        },
      });
      setLoading(false);
      setIsExist(error.response.data.message);
    } finally {
      toast.dismiss(toostId);
    }
  }

  return (
    <>
      <Helmet>
        <title>Fresh Cart | Signup</title>
        <meta name="description" content="Signup page of E-commerce website " />
        <meta name="keywords" content="E-commerce, Signup, Signup page" />
      </Helmet>

      <div className="mt-7 max-w-[28rem] mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 shadow-lg shadow-sky-900 rounded-xl sm:p-7">
          <div className="text-center ">
            <h1 className="block text-2xl uppercase font-bold text-gray-800 dark:text-white">
              <img
                src={logo}
                className="w-40 mx-auto mb-5"
                loading="lazy"
                alt="website logo"
              />
              Sign up
            </h1>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <svg
                className="w-4 h-auto"
                width={46}
                height={47}
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              Sign up with Google
            </button>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>
            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4">
                {/* name */}

                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    User Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      id="userName"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full outline-2  dark:text-white outline-sky-800 rounded-lg text-sm"
                      aria-describedby="email-error"
                    />
                    {formik.errors.name && formik.touched.name && (
                      <>
                        <div
                          className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                          role="alert"
                          tabIndex={-1}
                          aria-labelledby="hs-solid-color-danger-label"
                        >
                          <strong
                            id="hs-solid-color-danger-label"
                            className="font-bold "
                          >
                            Error :
                          </strong>{" "}
                          {formik.errors.name}
                        </div>
                      </>
                    )}

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

                {/* Form Group */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  {/* ? emailInput  */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full outline-2 dark:text-white outline-sky-800 rounded-lg text-sm"
                      aria-describedby="email-error"
                    />

                    {formik.errors.email && formik.touched.email && (
                      <>
                        <div
                          className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                          role="alert"
                          tabIndex={-1}
                          aria-labelledby="hs-solid-color-danger-label"
                        >
                          <strong
                            id="hs-solid-color-danger-label"
                            className="font-bold "
                          >
                            Error :
                          </strong>{" "}
                          {formik.errors.email}
                        </div>
                      </>
                    )}
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
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm outline-2  dark:text-white outline-sky-800"
                      aria-describedby="password-error"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <>
                        <div
                          className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                          role="alert"
                          tabIndex={-1}
                          aria-labelledby="hs-solid-color-danger-label"
                        >
                          <strong
                            id="hs-solid-color-danger-label"
                            className="font-bold "
                          >
                            Error :
                          </strong>{" "}
                          {formik.errors.password}
                        </div>
                      </>
                    )}

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
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters required
                  </p>
                </div>
                {/* End Form Group */}
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirm-password"
                      name="rePassword"
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm outline-2 dark:text-white outline-sky-800"
                      aria-describedby="confirm-password-error"
                    />

                    {formik.errors.rePassword && formik.touched.rePassword && (
                      <>
                        <div
                          className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                          role="alert"
                          tabIndex={-1}
                          aria-labelledby="hs-solid-color-danger-label"
                        >
                          <strong
                            id="hs-solid-color-danger-label"
                            className="font-bold "
                          >
                            Error :
                          </strong>{" "}
                          {formik.errors.rePassword}
                        </div>
                      </>
                    )}

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

                {/* phone */}
                <div>
                  <label
                    htmlFor="PhoneNumber"
                    className="block text-sm  text-sky-900 font-semibold mb-2 "
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id=" PhoneNumber"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full outline-2 dark:text-white outline-sky-800 rounded-lg text-sm"
                      aria-describedby="email-error"
                    />

                    {formik.errors.phone && formik.touched.phone && (
                      <>
                        <div
                          className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                          role="alert"
                          tabIndex={-1}
                          aria-labelledby="hs-solid-color-danger-label"
                        >
                          <strong
                            id="hs-solid-color-danger-label"
                            className="font-bold "
                          >
                            Error :
                          </strong>{" "}
                          {formik.errors.phone}
                        </div>
                      </>
                    )}

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
                {/* Checkbox */}
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ms-3">
                    <label
                      htmlFor="remember-me"
                      className="text-sm dark:text-white"
                    >
                      I accept the{" "}
                      <Link
                        to="#"
                        className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                {/* End Checkbox */}

                {isExist && (
                  <>
                    <div
                      className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                      role="alert"
                      tabIndex={-1}
                      aria-labelledby="hs-solid-color-danger-label"
                    >
                      <strong
                        id="hs-solid-color-danger-label"
                        className="font-bold "
                      >
                        Error :
                      </strong>{" "}
                      {isExist}
                    </div>
                  </>
                )}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading && (
                    <i className="fa-solid fa-spin fa-4 fa-spinner"></i>
                  )}
                  Sign up
                </button>

                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  Already have an account?
                  <Link
                    className="text-blue-600 ms-2 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    to="/login"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </>
  );
}
