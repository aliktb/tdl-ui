import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
  

    <Button
    fontSize={'sm'}
    fontWeight={400}
    variant={'link'}
    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
    Sign Out
    </Button >

    
  );
};

export default LogoutButton;
