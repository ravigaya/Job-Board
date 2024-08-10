import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css'; //
import './App.css';
import Registration from '../components/Registration';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from '../components/Login';

function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className="text-3xl font-bold underline">Hello world!</div>,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
     path:'/login',
     element: <Login/>

    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
