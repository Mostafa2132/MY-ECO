import { useContext } from "react";
import { userContextProvider } from "../../Context/UserContext/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let { token } = useContext(userContextProvider);

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
