import { Container } from "@chakra-ui/react";
import Footer from "../Footer";
import Header from "../Header";

import './Footer.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div id='page-container'>
        <div id="content-wrap">
          <Container maxW='80ch'>
            {children}
          </Container>
        </div>
        <div id='footer'>
        <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
