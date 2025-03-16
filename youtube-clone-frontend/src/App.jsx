import './App.css'
import Header from './component/header/Header'
import { Outlet } from 'react-router-dom'
import Home from './pages/Home/Home'
import { useState } from 'react'

function App() {

  const [sidebar, setSidebar] = useState(true);

 function hideSidebar(value) {
        setSidebar(value);
  }

  return (
    <>
      <div className='App'>
         <Header hideSidebar={hideSidebar} sidebar={sidebar}/>
         <Home sidebar={sidebar}/>
         <Outlet/>
      </div>
    </>
  )
}

export default App
