import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from './pages/signIn/SignIn'
import Home from './pages/Home/Home.jsx';
import "./index.css"
import Video from './pages/video/Video.jsx';
import Profile from './pages/profile/Profiel.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/signIn",
        element: <SignIn/>
      },
      {
        path:"/watch",
        element: <Video/>
      },
      {
        path:"user",
        element: <Profile/>
      }
    ]
  },

 
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {appRouter}/>
  </StrictMode>,
)
