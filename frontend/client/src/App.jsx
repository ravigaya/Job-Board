import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Registration from '../components/Registration';
import Login from '../components/Login';
import Home from '../components/Home';
import ApplyJob from '../components/Applyjob';

//import  PrivateComponent  '../components/PrivateComponent'; // Import the PrivateRoute component
import PrivateRoute from '../components/PrivateRoute';
function App() {

  
  const router = createBrowserRouter([
    {
      path: "/applyjob/:id",
      element: <PrivateRoute element={<ApplyJob/>} />, // Correct usage
    },
    {
      path: "/",
      element: <Home />,
    },
    
    // {
    //   path: "/applyjob/:id",
    //   element: <ApplyJob/>,
    // },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Login />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
