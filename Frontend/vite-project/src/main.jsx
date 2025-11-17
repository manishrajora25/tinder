import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./UserContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <UserProvider>
      <App />
    </UserProvider>
  
);






// import { UserProvider } from "./UserContext";
// import ReactDOM from "react-dom/client";
// import App from './App.jsx'

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <UserProvider>
//     <App />
//   </UserProvider>
// );
