import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from './pages/signIn/SignIn'
import Home from './pages/Home/Home.jsx';
import "./index.css"
import Video from './pages/video/Video.jsx';
import Profile from './pages/profile/Profiel.jsx';
import VideoUpload from './pages/videoUpload/VideoUpload.jsx';
import SignUp from './pages/signUp/SignUp.jsx';

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
        path: "/watch/:id",
        element: <Video/>
      },
      {
        path: "/user/:id",
        element: <Profile/>
      }, 
      {
        path: "/upload",
        element: <VideoUpload/>
      },
      {
        path: "/signUp",
        element: <SignUp/>
      }
    ]
  },

 
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {appRouter}/>
  </StrictMode>,
)
