import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/logo.svg";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false),
    navigate = useNavigate(),
    formik = useFormik({
      initialValues: { email: "" },
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Email is required")
          .email("Invalid email"),
      }),
      onSubmit: async (values) => {
        setIsLoading(true);
        let toastId = toast.loading("Loading...");
        try {
          const { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            values
          );
          data.statusMsg === "success" &&
            (toast.success(data.message),
            setTimeout(() => navigate("/verifyResetCode"), 500));
        } catch (e) {
          console.error(e);
        } finally {
          toast.dismiss(toastId), setIsLoading(false);
        }
      },
    });
  return (
    <>
      <Helmet>
        <title> Frech Cart | Forget Password</title>
        <meta
          name="description"
          content="Forget Password page of E-commerce website "
        />
        <meta
          name="keywords"
          content="E-commerce, Forget Password, Forget Password page"
        />
      </Helmet>
      <div className="mt-7 max-w-[28rem] mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 p-4 shadow-lg shadow-sky-900 sm:p-7 text-center">
        {" "}
        <img src={logo} className="w-40 mx-auto mb-5" alt="Logo" />{" "}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Forget Password
        </h1>{" "}
        <form onSubmit={formik.handleSubmit} className="mt-5 grid gap-y-4">
          {" "}
          <div>
            {" "}
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 text-sky-900 dark:text-white"
            >
              Email address
            </label>{" "}
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="py-3 px-4 block w-full rounded-lg text-sm dark:text-white outline-2 outline-sky-800"
              required
            />{" "}
            {formik.touched.email && formik.errors.email && (
              <div className="mt-2 bg-red-500 text-black rounded-lg p-4 font-bold">
                Error: {formik.errors.email}
              </div>
            )}{" "}
          </div>{" "}
          <button
            type="submit"
            className="w-full py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            disabled={isLoading}
          >
            {" "}
            {isLoading && (
              <i className="fa-solid fa-spinner animate-spin"></i>
            )}{" "}
            Submit{" "}
          </button>{" "}
        </form>{" "}
      </div>
    </>
  );
}
