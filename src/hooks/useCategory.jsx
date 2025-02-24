import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategory() {



  async function getCategories() {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/categories",
    };
    return axios.request(options);
  
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 12 * 60 * 60 * 1000,
  });


  return {data,isLoading,isError};
}
