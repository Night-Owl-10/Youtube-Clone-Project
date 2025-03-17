import "./HomePage.css"
import userContext from "../../utils/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const options = ["All", "Music", "Movies", "Games", "News", "Sports", "Shopping", "Courses", "Fashion & Beauty", "Podcast", "Educational", "Trailers", "Live", "Documentry", "Animals", "Social Media"]

function HomePage() {

    const data = useContext(userContext);
    return(
        <div className={data.sideBar ? "homepage" : "homepage2"}>
            <div className="filter-options">
            {
                options.map((item, index) => {
                    return(
                        <div key={index} className="filter-option">
                            {item}
                        </div>
                    );
                })
            }
            
            </div>

            <div className={data.sideBar ? "homepage-main": "homepage-main2"}>
           <Link to="/watch"style={{ textDecoration: 'none', color: 'inherit' }}><div className="youtube-videos">
                    <div className="youtube-thumbnails">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="thumbnail" className="youtube-thumbnailPic" />
                        <div className="youtube-thumbnailTiming">
                            28:05
                        </div>
                    </div>
                    <div className="youtube-title">
                        <div className="youtube-profile">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" alt="profile" className="youtube-title-thumbnail" />
                        </div>

                        <div className="youtube-title-name">
                            <div className="youtube-videoTitle">User1</div>
                            <div className="youtube-channelName">JSX</div>
                            <div className="youtube-videoViews">20 likes</div>
                        </div>
                    </div>
                </div></Link> 

                <Link to="/watch"style={{ textDecoration: 'none', color: 'inherit' }}> <div className="youtube-videos">
                    <div className="youtube-thumbnails">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="thumbnail" className="youtube-thumbnailPic" />
                        <div className="youtube-thumbnailTiming">
                            28:05
                        </div>
                    </div>
                    <div className="youtube-title">
                        <div className="youtube-profile">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" alt="profile" className="youtube-title-thumbnail" />
                        </div>

                        <div className="youtube-title-name">
                            <div className="youtube-videoTitle">User1</div>
                            <div className="youtube-channelName">JSX</div>
                            <div className="youtube-videoViews">20 likes</div>
                        </div>
                    </div>
                </div></Link>

                <Link to="/watch"style={{ textDecoration: 'none', color: 'inherit' }}> <div className="youtube-videos">
                    <div className="youtube-thumbnails">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="thumbnail" className="youtube-thumbnailPic" />
                        <div className="youtube-thumbnailTiming">
                            28:05
                        </div>
                    </div>
                    <div className="youtube-title">
                        <div className="youtube-profile">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" alt="profile" className="youtube-title-thumbnail" />
                        </div>

                        <div className="youtube-title-name">
                            <div className="youtube-videoTitle">User1</div>
                            <div className="youtube-channelName">JSX</div>
                            <div className="youtube-videoViews">20 likes</div>
                        </div>
                    </div>
                </div></Link>

                <Link to="/watch"style={{ textDecoration: 'none', color: 'inherit' }}> <div className="youtube-videos">
                    <div className="youtube-thumbnails">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="thumbnail" className="youtube-thumbnailPic" />
                        <div className="youtube-thumbnailTiming">
                            28:05
                        </div>
                    </div>
                    <div className="youtube-title">
                        <div className="youtube-profile">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" alt="profile" className="youtube-title-thumbnail" />
                        </div>

                        <div className="youtube-title-name">
                            <div className="youtube-videoTitle">User1</div>
                            <div className="youtube-channelName">JSX</div>
                            <div className="youtube-videoViews">20 likes</div>
                        </div>
                    </div>
                </div></Link>

                <Link to="/watch"style={{ textDecoration: 'none', color: 'inherit' }}><div className="youtube-videos">
                    <div className="youtube-thumbnails">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="thumbnail" className="youtube-thumbnailPic" />
                        <div className="youtube-thumbnailTiming">
                            28:05
                        </div>
                    </div>
                    <div className="youtube-title">
                        <div className="youtube-profile">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" alt="profile" className="youtube-title-thumbnail" />
                        </div>

                        <div className="youtube-title-name">
                            <div className="youtube-videoTitle">User1</div>
                            <div className="youtube-channelName">JSX</div>
                            <div className="youtube-videoViews">20 likes</div>
                        </div>
                    </div>
                </div></Link>

                <Link to="/watch"style={{ textDecoration: 'none', color: 'inherit' }}><div className="youtube-videos">
                    <div className="youtube-thumbnails">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="thumbnail" className="youtube-thumbnailPic" />
                        <div className="youtube-thumbnailTiming">
                            28:05
                        </div>
                    </div>
                    <div className="youtube-title">
                        <div className="youtube-profile">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" alt="profile" className="youtube-title-thumbnail" />
                        </div>

                        <div className="youtube-title-name">
                            <div className="youtube-videoTitle">User1</div>
                            <div className="youtube-channelName">JSX</div>
                            <div className="youtube-videoViews">20 likes</div>
                        </div>
                    </div>
                </div></Link>
            </div>
        </div>
    )
}

export default HomePage;