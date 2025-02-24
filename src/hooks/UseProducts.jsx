import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  async function getProducts() {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/products",
    };
    return  axios.request(options);
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 12 * 60 * 60 * 1000,

  });

  return { data, isLoading, isError };
}
