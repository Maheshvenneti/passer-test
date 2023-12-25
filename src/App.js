import React, {useState} from 'react';
import Home from './pages/home'
import User from "./pages/singleUserView"
import "./index.css"
import Context from "./components/context"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <User />,
  },
]);

function App() {
  const [userId, setUserId] = useState(null);
  const [singleUserData, setsingleUserData] = useState(null);
  return (
    <div>
      <Context.Provider value={{userId, setUserId,singleUserData, setsingleUserData}}>
       <RouterProvider router={router} />
      </Context.Provider>
    </div>
  );
}

export default App;
