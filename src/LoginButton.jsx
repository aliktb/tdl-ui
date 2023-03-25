import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  // const { user, isAuthenticated, isLoading } = useAuth0();


  return (
    <Button
      fontSize={'sm'}
      fontWeight={400}
      variant={'link'}
      onClick={() => loginWithRedirect()}>
      Sign In
    </Button >
  )



};

export default LoginButton;
