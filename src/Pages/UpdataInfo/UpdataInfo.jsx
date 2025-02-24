import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContextProvider } from "../../Context/UserContext/UserContext";
import logo from "../../assets/images/logo.svg";
import { Helmet } from "react-helmet";
export default function UpdataInfo() {
  const { token } = useContext(userContextProvider);
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [isExiest, setIsExiest] = useState("");
  //! vaildtion schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name Input  is required")
      .min(3, "Name must be at least 3 characters")
      .max(13, "Name must be at most  13 characters"),
    email: Yup.string()
      .required("Email Input  is required")
      .email("Email is not valid"),
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
      phone: "",
    },
    validationSchema,
    onSubmit: sendData,
  });

  // * send data to back end
  async function sendData(formData) {
    let toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        method: "PUT",
        headers: {
          token,
        },
        data: formData,
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Your account has been updated successfully");
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setIsExiest(error.response.data.errors);
      setLoading(false);
    } finally {
      toast.dismiss(toastId);
    }
  }


  return (
    <>
      <Helmet>
        <title>Fresh Cart | Updata Info</title>
        <meta
          name="description"
          content="Updata Info page of E-commerce website "
        />
        <meta
          name="keywords"
          content="E-commerce, Updata Info, Updata Info page"
        />
      </Helmet>

      <div className="mt-7 max-w-[28rem] mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 shadow-lg shadow-sky-900 rounded-xl sm:p-7">
          <div className="text-center ">
            <h1 className="block text-2xl font-bold uppercase text-gray-800 dark:text-white">
              <img
                src={logo}
                className="w-40 mx-auto mb-5"
                loading="lazy"
                alt="website logo"
              />
              Updata Your Information
            </h1>
          </div>
          <div className="mt-5">
            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4">
                {/* name */}
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm text-sky-900 font-semibold mb-2 "
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

                {/* email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-sky-800 font-semibold mb-2 "
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
                      className="py-3 px-4 block w-full outline-2 dark:text-white  outline-sky-800 rounded-lg text-sm"
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

                {/* phone */}
                <div>
                  <label
                    htmlFor="PhoneNumber"
                    className="block text-sm  text-sky-800  font-semibold mb-2 "
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

                {isExiest && (
                  <div
                    className="mt-2 bg-red-500 text-sm font-semibold text-black rounded-lg p-4"
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
                    {`This  ${isExiest.msg}`}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading && (
                    <i className="fa-solid fa-spin fa-4 fa-spinner"></i>
                  )}
                  Update Data
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </>
  );
}
