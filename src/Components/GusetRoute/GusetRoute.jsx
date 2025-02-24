import { useContext } from "react";
import { userContextProvider } from "../../Context/userContext/userContext";
import { Navigate } from "react-router-dom";

export default function GusetRoute({ children }) {
  let { token } = useContext(userContextProvider);

  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
