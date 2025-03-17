import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

function Header({hideSidebar, sidebar}) {

    function handleSidebar() {
        hideSidebar(!sidebar)
    }

    return (
        <div className="Header">

            <div className="sidebar">
            <div className="hamburgerMenu" onClick={handleSidebar}>
                <MenuIcon className="hamburger"/>
            </div>
            <Link to="/"style={{ textDecoration: 'none', color: 'inherit' }}><div className="sidebar-youtubeIcon">
                <YouTubeIcon sx={{fontSize: "44px"}} className="youtubeIcon"/>
                <div className="youtubeTitle"> YouTube</div>
            </div></Link>
            </div>

            <div className="header-search">
                <div className="searchbox">
                    <input type="text" placeholder="Search" className="search-input"/>
                    <div className="search-btn">
                        <SearchIcon className="search-icon"/>
                    </div>
                </div>
            </div>

            <div className="header-login">
                <VideoCallIcon sx={{fontSize: "30px"}} className="addVideo-icon"/>  
                <Link to="/signIn" style={{textDecoration: "none"}}><div className="login" >
                      <AccountCircleIcon/>
                      <p>Sign In</p>
                      </div> 
                </Link>

                <div className="signIn">
                    <div className="signIn-options">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;