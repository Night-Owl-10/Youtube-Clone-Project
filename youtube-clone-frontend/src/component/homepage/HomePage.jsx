import "./HomePage.css"
import userContext from "../../utils/userContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {

    const [content, setContent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/allVideo").then(res => {
          console.log(res.data.videos)
          setContent(res.data.videos);
        }).catch(err => {
          console.log(err);
        })
  }, [])

    const data = useContext(userContext);

    const options = ["All", "Music", "Movies", "Games", "News", "Sports", "Shopping", "Courses", "Fashion & Beauty", "Podcast", "Educational", "Trailers", "Live", "Documentry", "Animals", "Social Media"]
    
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

                {
                    content?.map((item, index) => {
                        return (
                        <Link to={`/watch/${item._id}`}style={{ textDecoration: 'none', color: 'inherit' }}><div className="youtube-videos">
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
                                <div className="youtube-channelName">{item?.user?.channelName}</div>
                                <div className="youtube-videoViews">{item?.like} likes</div>
                            </div>
                        </div>
                    </div></Link>
                    );
                    })
                }

           

                
            </div>
        </div>
    )
}

export default HomePage;