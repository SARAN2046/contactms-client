import { Navigate } from "react-router-dom";

const Protectedroutes = ( {children} ) => {

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace={true} />;
};

export default Protectedroutes;
