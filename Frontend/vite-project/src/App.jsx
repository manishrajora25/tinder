
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import First from './First.jsx'; 
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import PostPage from './pages/Post.jsx';
import Allposte from './pages/Allposte.jsx';
import Request from './pages/Requests.jsx';
import Friends from './pages/Friends.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';


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


  { path: "/request", 
    element: <Request /> },  

  {
    path: "/Friends",
    element: <Friends />,
  },
  {
    path: "/ChatPage/:id",
    element: <ChatPage />,
  },



  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },



  {
    path: "ResetPassword",
    element: <ResetPassword />,
  },

 


]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
