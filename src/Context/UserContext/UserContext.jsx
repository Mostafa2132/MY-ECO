import { createContext, useState } from "react";
export const userContextProvider = createContext(null);
export default function UserContext({ children }) {
  let [token, setToken] = useState(localStorage.getItem("userToken"));
  function logout() {
    localStorage.removeItem("userToken");
    setToken(null);
  }
  return (
    <>
      <userContextProvider.Provider value={{ token, setToken, logout }}>
        {children}{" "}
      </userContextProvider.Provider>{" "}
    </>
  );
}
