import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <div className="ButtonText" onClick={() => loginWithRedirect()}>Log In</div>;
};

export default LoginButton;