import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignIn from "../../pages/signIn/SignIn";
import axios from "axios";

function Header({hideSidebar, sidebar}) {

    const [useravatar, setAvatar] = useState("https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg");
    const [SignInChannel, setSignInChannel]= useState(false);
    const [signIn, setSignIn] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const navigate = useNavigate();


    function handleSidebar() {
        hideSidebar(!sidebar)
    }

    function handleSignInChannel() {
        setSignInChannel(prev => !prev);
    }

    function handleProfile() {
        let userId = localStorage.getItem("userId");
        navigate(`/user/${userId}`);
        setSignInChannel(false);
    }

    function navFunction(button) {
        setSignInChannel(false);
        if(button === "signIn") {
            setSignIn(true);
        } else {
            localStorage.clear();
            getSignedOutFun()
            setTimeout(() => {
                navigate("/")
                window.location.reload();
            }, 1000);
        }
    }

    async function getSignedOutFun() {
        axios.post("http://localhost:4000/auth/signOut", {}, {withCredentials: true}).then((res) => {
            console.log("Signed Out")
        }).catch(err =>  {
            console.log(err)
        })
    }

    function handleCancelChannelPage() {
        setSignIn(false);
    }

    useEffect(() => {
            let userAvatar = localStorage.getItem("userAvatar");
            setIsSignedIn(localStorage.getItem("userId") !== null ? true : false);
            if(userAvatar !== null) {
                setAvatar(userAvatar)
            }

    },[])


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
            <Link to="/upload" style={{textDecoration: "none"}}>
            <VideoCallIcon sx={{fontSize: "30px"}} className="addVideo-icon"/>
            </Link>
                <img src={useravatar} alt="" className="avatarLogo" onClick={ handleSignInChannel}/>
            
              {SignInChannel && <div className="signIn-Channel">
                    {isSignedIn && <div className="signIn-Channel-options" onClick={handleProfile} >View Channel</div>}
                    {isSignedIn && <div className="signIn-Channel-options" onClick={() => navFunction("signOut")}>Sign Out</div>}
                    {!isSignedIn &&  <div className="signIn-Channel-options" onClick={() => navFunction("signIn")}>Sign In</div>}
                    
                    
                </div>}
            

            </div>
                    {
                        signIn && <SignIn handleCancelChannelPage={handleCancelChannelPage}/>
                    }
        </div>
    )
}

export default Header;