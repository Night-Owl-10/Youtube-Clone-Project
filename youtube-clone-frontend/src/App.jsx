import './App.css'
import Header from './component/header/Header'
import { Outlet } from 'react-router-dom'
import Home from './pages/home/Home'
import { useState, useEffect } from 'react'
import userContext from './utils/userContext'
import axios from 'axios'
import { AuthProvider } from './utils/authContext';


function App() {

  const [sidebar, setSidebar] = useState(true);

  /*useEffect(() => {
        axios.get("http://localhost:4000/api/allVideo").then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err);
        })
  }, [])*/

 function hideSidebar(value) {
        setSidebar(value);
  }

  return (
    <AuthProvider>
    <userContext.Provider value={{sideBar: sidebar, setSidebar}}>
      <div className='App'>
         <Header hideSidebar={hideSidebar} sidebar={sidebar}/>
         <Outlet/>
      </div>
    </userContext.Provider>
    </AuthProvider>
  )
}

export default App
