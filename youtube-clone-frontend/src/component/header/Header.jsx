import "./Header.css"
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import CreateChannel from "../createChannel/CreateChannel";
import AuthContext from "../../utils/authContext";
import { toast } from "react-toastify";

function Header({ hideSidebar, sidebar }) {

    const navigate = useNavigate();
    const { isSignedIn, channel, user, signOut, loading } = useContext(AuthContext);

    const [channelPage, setChannelPage] = useState(false);
    const [signInChannel, setSignInChannel] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    console.log("Header render - Auth state:", { isSignedIn, channel, user, loading });

    function handleSidebar() {
        hideSidebar(!sidebar)
    }

    function handleSignInChannel() {
        setSignInChannel(prev => !prev);
    }

    function handleChannelPage() {
        setChannelPage(!channelPage)
        setSignInChannel(false);
    }

    function handleCancelChannelPage() {
        setChannelPage(false);
    }

    function handleProfile() {
        let userId = localStorage.getItem("userId");
        navigate(`/user/${userId}`);
        setSignInChannel(false);
    }

    async function handleSignOut() {
        try {
            const res = await axios.post("http://localhost:4000/auth/signOut", {}, { withCredentials: true });
            toast.success(res.data.message);
            console.log("Logout successful");
        } catch (err) {
            console.log("Logout error:", err);
        }


        signOut();
        setSignInChannel(false);
        navigate("/");
    }


    function handleSearchInputChange(e) {
        setSearchQuery(e.target.value);
    }


    async function handleSearch() {
        if (!searchQuery.trim()) {
            return;
        }

        setIsSearching(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchResults(response.data.videos || []);
            setShowSearchResults(true);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
            setShowSearchResults(true);
        } finally {
            setIsSearching(false);
        }
    }


    function handleSearchKeyPress(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }


    function handleSearchResultClick(videoId) {
        setShowSearchResults(false);
        setSearchQuery("");
        navigate(`/watch/${videoId}`);
    }


    function handleClickOutside() {
        setShowSearchResults(false);
    }


    const getUserAvatar = () => {
        if (user?.avatar) {
            return user.avatar;
        }
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTq7NhS34vHRoyhJB5SwOcs5OA6Y3xlaj6OA&s";
    };

    async function handleDeleteAccount() {
        const userId = localStorage.getItem("userId");
        const res = await axios.delete(`http://localhost:4000/auth/deleteUser/${userId}`, { withCredentials: true });
        toast.success(res.data.message);
        signOut();
        setSignInChannel(false);
        navigate("/");
    }


    if (loading) {
        return (
            <div className="Header">
                <div className="sidebar">
                    <div className="hamburgerMenu" onClick={handleSidebar}>
                        <MenuIcon className="hamburger" />
                    </div>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="sidebar-youtubeIcon">
                            <YouTubeIcon sx={{ fontSize: "44px" }} className="youtubeIcon" />
                            <div className="youtubeTitle"> YouTube</div>
                        </div>
                    </Link>
                </div>
                <div className="header-search">
                    <div className="searchbox">
                        <input type="text" placeholder="Search" className="search-input" />
                        <div className="search-btn">
                            <SearchIcon className="search-icon" />
                        </div>
                    </div>
                </div>
                <div className="header-login">
                    <div className="loading-spinner">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="Header" onClick={handleClickOutside}>

            <div className="sidebar">
                <div className="hamburgerMenu" onClick={handleSidebar}>
                    <MenuIcon className="hamburger" />
                </div>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><div className="sidebar-youtubeIcon">
                    <YouTubeIcon sx={{ fontSize: "44px" }} className="youtubeIcon" />
                    <div className="youtubeTitle"> YouTube</div>
                </div></Link>
            </div>

            <div className="header-search">
                <div className="searchbox">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleSearchKeyPress}
                    />
                    <div className="search-btn" onClick={handleSearch}>
                        {isSearching ? (
                            <div className="search-loading-spinner">...</div>
                        ) : (
                            <SearchIcon className="search-icon" />
                        )}
                    </div>
                </div>


                {showSearchResults && (
                    <div className="search-results" onClick={(e) => e.stopPropagation()}>
                        {isSearching ? (
                            <div className="search-loading">Searching...</div>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((video) => (
                                <div
                                    key={video._id}
                                    className="search-result-item"
                                    onClick={() => handleSearchResultClick(video._id)}
                                >
                                    <img src={video.thumbnail} alt={video.title} className="search-result-thumbnail" />
                                    <div className="search-result-info">
                                        <div className="search-result-title">{video.title}</div>
                                        <div className="search-result-channel">{video.channel?.channelName}</div>
                                        <div className="search-result-views">{video.like} likes</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="search-no-results">No videos found</div>
                        )}
                    </div>
                )}
            </div>

            <div className="header-login">
                {isSignedIn && (
                    <Link to="/upload" style={{ textDecoration: "none" }}>
                        <VideoCallIcon sx={{ fontSize: "30px" }} className="addVideo-icon" />
                    </Link>
                )}

                {
                    isSignedIn ?
                        <img src={getUserAvatar()} alt="User Avatar" className="avatarLogo" onClick={handleSignInChannel} /> :
                        <Link to="/signIn" style={{ textDecoration: "none" }}>
                            <div className="login">
                                <AccountCircleIcon />
                                <p>Sign In</p>
                            </div>
                        </Link>
                }

                {signInChannel &&
                    <div className="signIn-Channel">
                        {channel && <div className="signIn-Channel-options" onClick={handleProfile}>View Channel</div>}
                        {!channel && <div className="signIn-Channel-options" onClick={handleChannelPage}>Create Channel</div>}
                        {isSignedIn && <div className="signIn-Channel-options" onClick={handleSignOut}>Sign Out</div>}
                        {isSignedIn && <div className="signIn-Channel-options" onClick={handleDeleteAccount}>Delete Account</div>}
                    </div>
                }

            </div>
            {
                channelPage && <CreateChannel handleCancelChannelPage={handleCancelChannelPage} />
            }
        </div>
    )
}

export default Header;