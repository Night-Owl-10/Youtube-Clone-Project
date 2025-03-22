import SideBar from "../../component/SideBar/SideBar";
import "./Profile.css"
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { Link } from "react-router-dom";
import userContext from "../../utils/userContext";
import { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile() {

    const {id} = useParams();
    console.log(id);

    const [content, setContent] = useState([]);
    const [user, setUser] = useState(null);

    async function fetchProfileData() {
        axios.get(`http://localhost:4000/api/${id}/channel`).then((response) => {
            console.log(response);
            console.log(response.data.video);
            setContent(response.data.video);
            setUser(response.data.video[0]?.user);
        }).catch(err => {
            console.log(err);
          })
    }

    useEffect(() => {
        fetchProfileData();
    },[])

    const data = useContext(userContext);

    return(
        <div className="profile">
            <SideBar/>

            <div className={data.sideBar ? "profilePage" : "profilePage2"}>

                <div className="profilPageTopSection">
                
                    <div className="profilePageTopSectionImgContainer">
                    <div className="profilePageTopSectionImg">
                        <img src={user?.avatar} alt="" className="profilePageProfileImage" />
                    </div>
                    <div className="profilePageTopSectionAbout">
                        <div className="profilePageTopSectionAbout-name">
                                {user?.channelName}
                        </div>
                        <div className="profilePageTopSectionAbout-info">
                                @{user?.userName} . {content.length} videos
                        </div>
                        <div className="profilePageTopSectionAbout-info">
                                {user?.channelDescription}
                        </div>
                    </div>
                    </div>
                    
                </div>

                <div className="profilePageVideos">
                        <div className="profilePageVideoTitle">Videos &nbsp; <ArrowRightOutlinedIcon sx={{fontSize: 35}}/></div>

                        <div className="profilePageVideos-videos">

                            {
                                content.map((item, key) => {
                                    return(
                                        <Link to={`/watch/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}><div className="profilePageVideos-videosBlock">
                                    <div className="profilePageVideos-videosThumbnail">
                                        <img src={item?.thumbnail} alt="" className="profilePageVideos-videosThumbnailImg" />
                                    </div>
    
                                    <div className="profilePageVideos-videosDetails">
                                    <div className="profilePageVideos-videosDetailsName">{item.title}</div>
                                    <div className="profilePageVideos-videosDetailsAbout">{item.createdAt.slice(0, 10)}</div>
                                </div>
                                </div></Link>
                                )})
                                
                                    
                            }

                        


                        </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;