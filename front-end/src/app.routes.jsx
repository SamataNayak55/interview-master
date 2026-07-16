import {createBrowserRouter} from "react-router"
import Login from "./feature/auth/pages/login.jsx"
import Register from "./feature/auth/pages/register.jsx"
import Protected from "./feature/auth/components/protected.jsx"
import Home from "./feature/ai/pages/home.jsx"
import Interview from "./feature/ai/pages/Interview.jsx"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/home",
    element: <Protected> <Home /> </Protected>
  },{
    path: "/interview/:interviewId",
    element:<Protected> <Interview /> </Protected>
  }
])