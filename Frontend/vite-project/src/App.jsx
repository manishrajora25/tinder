// import React from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import First from './First.jsx'; 
// import Home from './pages/Home.jsx';
// import Login from './pages/Login.jsx';
// import Register from './pages/Register.jsx';



// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/",
//     element: <First />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//     ],
//   },
// ]);

// const Main = () => {
//   return (
//     <UserContextProvider>
//       <RouterProvider router={router} />
//     </UserContextProvider>
//   );
// };

// export default Main;






import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import First from './First.jsx'; 
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import PostPage from './pages/Post.jsx';
import Allposte from './pages/Allposte.jsx';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/PostPage",
    element: <PostPage />,
  },

  {
    path: "/allposte",
    element: <Allposte />,
  },


]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
