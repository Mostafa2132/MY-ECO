import "./App.css";
import "preline/preline";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { Toaster } from "react-hot-toast";
import UserContext from "./Context/userContext/userContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import GusetRoute from "./Components/GusetRoute/GusetRoute";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import CartContext from "./Context/CartContext/CartContext";
import Notfound from "./Pages/Notfound/Notfound";
import Wishlist from "./Pages/Wishlist/Wishlist";
import WishlistContext from "./Context/WishlistContext/WishlistContext";
import Brands from "./Pages/Brands/Brands";
import Category from "./Pages/Category/Category";
import Products from "./Pages/Products/Products";
import Checkout from "./Pages/Checkout/Checkout";
import Allorders from "./Pages/Allorders/Allorders";
import RelatedBrandProducts from "./Pages/RelatedBrandProducts/RelatedBrandProducts";
import RelatedCategoryProducts from "./Pages/RelatedCategoryProducts/RelatedCategoryProducts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/resetPassword";
import UpdataInfo from "./Pages/UpdataInfo/UpdataInfo";

//*  ££££££££££££££££££££££££££££££££££££££££££££££  APP routing  ££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££
let router = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "brands", element: <Brands /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Category /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "checkout", element: <Checkout /> },
      { path: "allorders", element: <Allorders /> },
      { path: "relatedBrandProducts/:id", element: <RelatedBrandProducts /> },
      {
        path: "relatedCategoryProducts/:catId",
        element: <RelatedCategoryProducts />,
      },
      { path: "/productDetails/:id/:catId", element: <ProductDetails /> },
      { path: "updateInfo", element: <UpdataInfo /> },
    ],
  },
  {
    path: "",
    element: (
      <GusetRoute>
        <Layout />
      </GusetRoute>
    ),
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "verifyResetCode", element: <VerifyResetCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
    ],
  },
  {
    path: "",
    element: <Layout />,
    children: [{ path: "*", element: <Notfound /> }],
  },
]);

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext>
          <CartContext>
            <WishlistContext>
              <RouterProvider router={router}></RouterProvider>
            </WishlistContext>
          </CartContext>
        </UserContext>

        <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #075985",
              padding: "16px 25px",
              color: "#fff",
              fontSize: "18px",
              backgroundColor: "#075985",
            },
          }}
        />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
