import { useContext, useEffect, useState } from "react";
import OrdersItems from "../../Components/OrdersItems/OrdersItems";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { userContextProvider } from "../../Context/UserContext/UserContext";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Allorders() {
  let [orderDetails, setOrderDetails] = useState(null);

  let { token } = useContext(userContextProvider);
  const { id } = jwtDecode(token);

  async function getOrderDetails() {
    try {
      const options = {
        method: "GET",
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      };
      let { data } = await axios.request(options);
      setOrderDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <Helmet>
        <title> Fresh Cart | All orders</title>
        <meta
          name="description"
          content="All orders page of E-commerce website "
        />
        <meta
          name="keywords"
          content="E-commerce, All orders, orders, orders page"
        />
        <meta name="author" content="Mostafa Mohamed Ebrahim" />
      </Helmet>

{orderDetails === null  ? (
  <Loading />
) : orderDetails?.length === 0 ? (
<div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
<svg
  width="200"
  height="200"
  viewBox="0 0 200 200"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  
  <rect x="40" y="70" width="120" height="60" rx="8" fill="#FBBF24" />
  <polygon points="40,70 100,30 160,70" fill="#F59E0B" />
  <polygon points="40,130 100,170 160,130" fill="#FCD34D" />
  
  
  <path d="M100 30 L40 70 L160 70 Z" fill="rgba(0,0,0,0.1)" />
  
 
  <line x1="60" y1="90" x2="140" y2="90" stroke="#fff" strokeWidth="2" strokeDasharray="5,5"/>
  
 
  <text x="50" y="190" fontSize="16" fill="#374151" fontWeight="bold">
    No Orders Yet
  </text>
</svg>

  <h1 className="text-3xl font-bold text-gray-800 dark:text-neutral-200">
    No Orders Yet!
  </h1>
  <p className="text-lg text-gray-600 dark:text-neutral-400">
    You haven't placed any orders yet. Start shopping now!
  </p>
</div>

) : (
  orderDetails.map((item) => (
    <OrdersItems key={item.id} orderDetails={item} />
  ))
)}

    </>
  );
}
