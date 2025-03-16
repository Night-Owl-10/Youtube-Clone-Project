import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn.jsx';
import "./index.css"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/signIn",
        element: <SignIn/>
      }
    ]
  },
 
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {appRouter}/>
  </StrictMode>,
)
