import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();



  return (
    <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            colorScheme='blue'
            href={'#'}
            _hover={{
              bg: 'blue.600',
            }}
      onClick={() => loginWithRedirect()}>
      Sign In
    </Button >
  )



};

export default LoginButton;
