import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import axios from "axios";
import { Helmet } from "react-helmet";
export default function VerifyResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: sendData,
  });
  async function sendData(values) {
    setIsLoading(true);
    let toastId = toast.loading("Loading...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "Success") {
        setIsLoading(false);
        setTimeout(() => {
          navigate("/resetPassword");
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      toast.dismiss(toastId);
      setIsLoading(false);
    }
  }
  return (
    <>
      <Helmet>
        <title>Fresh Card | Verify Reset Code</title>
        <meta
          name="description"
          content="Verify Reset Code page of E-commerce website "
        />
        <meta
          name="keywords"
          content="E-commerce, Verify Reset Code, Verify Reset Code page"
        />
      </Helmet>

      <div className="mt-7 max-w-[28rem] mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 shadow-lg shadow-sky-900 rounded-xl sm:p-7">
          <div className="text-center ">
            <img src={logo} className="w-40 mx-auto mb-5" alt="" />
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forget Password
            </h1>
          </div>
          <div className="mt-5">
            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4">
                {/* Form Group */}
                <div>
                  <label
                    htmlFor="resetCode"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    Your Reset Code
                  </label>
                  {/* ? emailInput  */}
                  <div className="relative">
                    <input
                      type="text"
                      id="resetCode"
                      name="resetCode"
                      value={formik.values.resetCode.trim()}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full outline-2 dark:text-white outline-sky-800 rounded-lg text-sm"
                      required=""
                      aria-describedby="email-error"
                    />
                    {formik.errors.resetCode && formik.touched.resetCode && (
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
                          {formik.errors.resetCode}
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

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading && (
                    <i className="fa-solid fa-spinner animate-spin"></i>
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
