import { useContext } from "react";
import { userContextProvider } from "../../Context/UserContext/UserContext";
import { Navigate } from "react-router-dom";

export default function GusetRoute({ children }) {
  let { token } = useContext(userContextProvider);

  if (token) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
