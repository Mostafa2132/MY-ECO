import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import logo from "../../assets/images/logo.svg";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContextProvider } from "../../Context/userContext/userContext";
import { Helmet } from "react-helmet";
export default function Login() {
  let { setToken } = useContext(userContextProvider),
    [isExist, setIsExist] = useState(null),
    navigate = useNavigate(),
    [loading, setLoading] = useState(!1),
    validationSchema = Yup.object().shape({
      email: Yup.string()
        .required("Email Input is required")
        .email("Email is not valid"),
      password: Yup.string()
        .required("Password Input is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),
    formik = useFormik({
      initialValues: { email: "", password: "" },
      validationSchema,
      onSubmit: sendData,
    });
  async function sendData(e) {
    let o = toast.loading("Loading...");
    setLoading(!0);
    try {
      let { data: t } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        e
      );
      "success" === t.message &&
        (toast.success("Successfully logged in!"),
        setToken(t.token),
        localStorage.setItem("userToken", t.token),
        localStorage.setItem("userEmail", t.user.email),
        localStorage.setItem("userName", t.user.name),
        setLoading(!1),
        setTimeout(() => {
          navigate("/");
        }, 2e3));
    } catch (e) {
      setIsExist(e.response.data.message),
        toast.error(e.response.data.message, {
          style: {
            border: "1px solid #B91C1C",
            padding: "16px",
            color: "#fff",
            backgroundColor: "#B91C1C",
          },
        }),
        setLoading(!1);
    } finally {
      toast.dismiss(o);
    }
  }
  return (
    <>
      {" "}
      <Helmet>
        {" "}
        <title>Fresh Cart | Login </title>{" "}
        <meta name="description" content="Login page of E-commerce website " />{" "}
        <meta name="keywords" content="E-commerce, Login, Login page" />{" "}
      </Helmet>{" "}
      <div className="mt-7 max-w-[28rem] mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        {" "}
        <div className="p-4 shadow-lg shadow-sky-900 rounded-xl sm:p-7">
          {" "}
          <div className="text-center ">
            {" "}
            <img
              src={logo}
              className="w-40 mx-auto mb-5 "
              loading="lazy"
              alt="login logo"
            />{" "}
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              {" "}
              Log in{" "}
            </h1>{" "}
          </div>{" "}
          <div className="mt-5">
            {" "}
            <form onSubmit={formik.handleSubmit}>
              {" "}
              <div className="grid gap-y-4">
                {" "}
                <div>
                  {" "}
                  <label
                    htmlFor="email"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    {" "}
                    Email address{" "}
                  </label>{" "}
                  <div className="relative">
                    {" "}
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full outline-2 dark:text-white outline-sky-800 rounded-lg text-sm"
                      required
                    />{" "}
                    {formik.errors.email && formik.touched.email && (
                      <div
                        className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                        role="alert"
                      >
                        {" "}
                        <strong className="font-bold"> Error : </strong>
                        {formik.errors.email}{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <label
                    htmlFor="password"
                    className="block text-sm text-sky-900 font-semibold mb-2 dark:text-white"
                  >
                    {" "}
                    Password{" "}
                  </label>{" "}
                  <div className="relative">
                    {" "}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm outline-2 dark:text-white outline-sky-800"
                      required
                    />{" "}
                    {formik.errors.password && formik.touched.password && (
                      <div
                        className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                        role="alert"
                      >
                        {" "}
                        <strong className="font-bold"> Error : </strong>
                        {formik.errors.password}{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                </div>{" "}
                {isExist && (
                  <div
                    className="mt-2 bg-red-500 text-sm text-black rounded-lg p-4"
                    role="alert"
                  >
                    {" "}
                    <strong className="font-bold"> Error : </strong>
                    {isExist}{" "}
                  </div>
                )}{" "}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {" "}
                  {loading && (
                    <i className="fa-solid fa-spin fa-4 fa-spinner"></i>
                  )}{" "}
                  Login{" "}
                </button>{" "}
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  {" "}
                  don't have an account?{" "}
                  <Link
                    className="text-blue-600 ms-2 decoration-2 hover:underline font-medium"
                    to="/signup"
                  >
                    {" "}
                    Sign up here{" "}
                  </Link>{" "}
                </p>{" "}
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  {" "}
                  Forget your password?{" "}
                  <Link
                    className="text-blue-600 ms-2 decoration-2 hover:underline font-medium"
                    to="/forgetPassword"
                  >
                    {" "}
                    Click here{" "}
                  </Link>{" "}
                </p>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
