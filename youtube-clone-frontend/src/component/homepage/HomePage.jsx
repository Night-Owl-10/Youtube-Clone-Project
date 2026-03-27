import "./HomePage.css"
import userContext from "../../utils/userContext";
import AuthContext from "../../utils/authContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
    const [content, setContent] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const auth = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/allVideo`).then(res => {
            console.log(res.data.videos)
            setContent(res.data.videos);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const data = useContext(userContext);

    const options = ["All", "Music", "Movies", "Games", "News", "Sports", "Shopping", "Courses", "Fashion & Beauty", "Podcast", "Educational", "Trailers", "Live", "Documentry", "Animals", "Social Media"]


    if (!auth.isSignedIn) {
        return (
            <div className={"homepage2"}>
                <div className="homepage-main-guest">
                    <div className="youtube-guest-message">
                        <h2>Try searching to get started</h2>
                        <p>Start watching videos to help us build a feed of videos you'll love.</p>
                    </div>
                </div>
            </div>
        );
    }


    const filteredVideos = selectedCategory === "All"
        ? content
        : content.filter(item => (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase()));

    return (
        <div className={data.sideBar ? "homepage" : "homepage2"}>
            <div className="filter-options">
                {
                    options.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`filter-option${selectedCategory === item ? " selected" : ""}`}
                                onClick={() => setSelectedCategory(item)}
                            >
                                {item}
                            </div>
                        );
                    })
                }
            </div>

            <div className={data.sideBar ? "homepage-main" : "homepage-main2"}>
                {
                    filteredVideos?.map((item, index) => {
                        return (
                            <Link to={`/watch/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={item._id}>
                                <div className="youtube-videos">
                                    <div className="youtube-thumbnails">
                                        <img src={item.thumbnail} alt="thumbnail" className="youtube-thumbnailPic" />
                                        <div className="youtube-thumbnailTiming">
                                            28:05
                                        </div>
                                    </div>
                                    <div className="youtube-title">
                                        <div className="youtube-profile">
                                            <img src={item?.user?.avatar} alt="profile" className="youtube-title-thumbnail" />
                                        </div>
                                        <div className="youtube-title-name">
                                            <div className="youtube-videoTitle">{item?.title}</div>
                                            <div className="youtube-channelName">{item?.channel?.channelName}</div>
                                            <div className="youtube-videoInfo">
                                                <div className="youtube-videoViews">{item?.views} views</div>
                                                <div className="youtube-videoCreatedAt">{item?.createdAt.slice(0, 10)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default HomePage;