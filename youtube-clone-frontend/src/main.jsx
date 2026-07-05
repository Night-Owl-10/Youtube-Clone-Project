import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from './pages/signIn/SignIn'
import Home from './pages/home/Home.jsx';
import "./index.css"
import Video from './pages/video/Video.jsx';
import Profile from './pages/profile/Profiel.jsx';
import VideoUpload from './pages/videoUpload/VideoUpload.jsx';
import SignUp from './pages/signUp/SignUp.jsx';
import PageNotFound from './pages/pageNotFound/PageNotFound.jsx';
import VerifyOtp from "./pages/verifyOtp/VerifyOtp.jsx";
import PasswordReset from "./pages/passwordReset/PasswordReset.jsx";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.jsx";
import OAuthSuccess from "./pages/oAuthSuccess/OAuthSuccess.jsx";

//main.jsx 
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signIn",
        element: <SignIn />
      },
      {
        path: "watch/:id",
        element: <Video />
      },
      {
        path: "user/:id",
        element: <Profile />
      },
      {
        path: "upload",
        element: <VideoUpload />
      },
      {
        path: "signUp",
        element: <SignUp />
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />
      },
      {
        path: "password-reset",
        element: <PasswordReset />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/oauth-success",
        element: <OAuthSuccess />
      }
    ],
    errorElement: <PageNotFound />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
