import './App.css'
import Header from './component/header/Header'
import { Outlet } from 'react-router-dom'
import Home from './pages/Home/Home'
import { useState } from 'react'
import userContext from './utils/userContext'



function App() {

  const [sidebar, setSidebar] = useState(true);

 function hideSidebar(value) {
        setSidebar(value);
  }

  return (
    <userContext.Provider value={{sideBar: sidebar, setSidebar}}>
      <div className='App'>
         <Header hideSidebar={hideSidebar} sidebar={sidebar}/>
         <Outlet/>
      </div>
    </userContext.Provider>
  )
}

export default App
