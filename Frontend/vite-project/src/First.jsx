// import React from 'react'


// import Header from "./component/Header.jsx"
// // import Footer from "./component/Footer.jsx"
// import { Outlet } from 'react-router-dom'

// const First = () => {
//  return (
//     <>
//       <Header />
//       <Outlet />
//       {/* <Footer /> */}
      
//     </>
//   );
// }

// export default First;




import React from "react";
import Header from "./component/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer.jsx";

const First = () => {
  return (
    <>
      <Header />
      <Outlet />

      {/* Footer only mobile */}
      <div className="md:hidden">
        <Footer />
      </div>
    </>
  );
};

export default First;
