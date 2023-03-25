import Footer from "../Footer";
import Header from "../Header";

import './Footer.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div id='page-container'>
        <div id="content-wrap">
          {children}
        </div>
        <div id='footer'>
        <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
