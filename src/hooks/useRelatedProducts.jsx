import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export default function useRelatedProducts() {
  const { catId } = useParams();
  async function getRelatedProducts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`,
      method: "GET",
    };
    return axios.request(options);
  };
  let { data, isLoading, isError } = useQuery({
    queryKey: ["relatedProducts"],
    queryFn: getRelatedProducts,
  });
  return { data, isLoading, isError };
}
