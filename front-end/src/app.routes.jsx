import {createBrowserRouter} from "react-router-dom"
import Login from "./feature/auth/pages/login.jsx"
import Register from "./feature/auth/pages/register.jsx"
 import Protected from "./feature/auth/components/protected.jsx"
import Home from "./feature/ai/pages/home.jsx"
import Interview from "./feature/ai/pages/Interview.jsx"
import History from "./feature/ai/pages/history.jsx"
import LandingPage from "./feature/landingPage/landingPage.jsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
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
    // element: <Home />
    
  },{
    path: '/history',
    element:<Protected> <History /> </Protected>
  },{
    path: "/interview/:interviewId",
    element:<Protected> <Interview /> </Protected>
    // path: "/",
    // element: <Interview />
  }
])