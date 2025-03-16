import HomePage from "../../component/homepage/HomePage";
import SideBar from "../../component/SideBar/SideBar";
import "./Home.css"

function Home({sidebar}) {
    return(
        <div className="home">
            <SideBar sidebar={sidebar}/>
            <HomePage sidebar={sidebar}/>
        </div>
    )
}

export default Home;