import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useNavigate, useRouteError } from "react-router-dom";

const DisplayError = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const routeError = useRouteError();
  const handleLogoutUser = () => {
    logoutUser()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="text-center mt-24">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <button className="btn btn-error my-5" onClick={handleLogoutUser}>Logout</button>
      <p>
        <i>{routeError.statusText || routeError.message}</i>
      </p>
    </div>
  );
};

export default DisplayError;
