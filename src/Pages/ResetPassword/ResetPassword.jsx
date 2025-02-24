import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../../assets/images/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function ResetPassword() {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Input  is required")
      .email("Email is not valid"),
    newPassword: Yup.string()
      .required("Password Input  is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: sendData,
  });

  async function sendData(formData) {
    let toostId = toast.loading("Loading...");
    setLoading(true);
    try {
      let options = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        method: "PUT",
        data: formData,
      };
      let { data } = await axios.request(options);
      if (data) {
        toast.success("Your password has been Updated successfully");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      toast.dismiss(toostId);
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title> Frech Cart | Reset Password</title>
        <meta
          name="description"
          content="Reset Password page of E-commerce website "
        />
        <meta
          name="keywords"
          content="E-commerce, Reset Password, Reset Password page"
        />
      </Helmet>

      <div className="mt-7 max-w-[28rem] mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 shadow-lg shadow-sky-900 rounded-xl sm:p-7">
          <div className="text-center ">
            <img
              src={logo}
              className="w-40 mx-auto mb-5"
              loading="lazy"
              alt="website logo"
            />
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Reset Password
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
                      required=""
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
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm outline-2 dark:text-white outline-sky-800"
                      required=""
                      aria-describedby="password-error"
                    />
                    {formik.errors.newPassword &&
                      formik.touched.newPassword && (
                        <>
                          <div
                            className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                            role="alert"
                            tabIndex={-1}
                            aria-labelledby="hs-solid-color-danger-label"
                          >
                            <span
                              id="hs-solid-color-danger-label"
                              className="font-bold "
                            >
                              Error :
                            </span>{" "}
                            {formik.errors.newPassword}
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
                {/* Form Group */}

                {/* End Form Group */}
                {/* Checkbox */}

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading && (
                    <i className="fa-solid fa-spin fa-4 fa-spinner"></i>
                  )}
                  Submit
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
