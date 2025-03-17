import HomePage from "../../component/homepage/HomePage";
import SideBar from "../../component/SideBar/SideBar";
import "./Home.css"

function Home() {
    return(
        <div className="home">
            <SideBar/>
            <HomePage/>
        </div>
    )
}

export default Home;