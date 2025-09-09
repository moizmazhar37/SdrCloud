import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "src/context/Auth";

// AuthGuard component to protect routes based on authentication status
export default function AuthGuard(props) {
  const { children } = props;

  const auth = useContext(AuthContext);
  // Effect to check the token in local storage and trigger re-render on change
  useEffect(() => {}, [window.localStorage.getItem("token")]);

  // Redirect to login if the user is not logged in
  if (!auth.userLoggedIn) {
    return <Redirect to="/" />;
  }
  // Render children components if the user is authenticated
  return <>{children}</>;
}
