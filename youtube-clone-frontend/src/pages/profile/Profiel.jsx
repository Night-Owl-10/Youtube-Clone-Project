import SideBar from "../../component/sideBar/SideBar";
import "./Profile.css"
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { Link } from "react-router-dom";
import userContext from "../../utils/userContext";
import { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile() {
    const { id } = useParams();
    const [content, setContent] = useState([]);
    const [user, setUser] = useState(null);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchProfileData() {
        try {

            const channelRes = await axios.get(`http://localhost:4000/api/channel/user/${id}`);
            setChannel(channelRes.data.channel);
        } catch (err) {
            setChannel(null);
        }
        try {

            const userRes = await axios.get(`http://localhost:4000/auth/user/${id}`);
            setUser(userRes.data.user);
        } catch (err) {
            setUser(null);
        }
        try {

            const videoRes = await axios.get(`http://localhost:4000/api/${id}/channel`);
            setContent(videoRes.data.video || []);
        } catch (err) {
            setContent([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProfileData();
    }, [id]);

    const data = useContext(userContext);

    if (loading) {
        return <div className="profile"><SideBar /><div className="profilePage">Loading...</div></div>;
    }

    return (
        <div className="profile">
            <SideBar />
            <div className={data.sideBar ? "profilePage" : "profilePage2"}>
                <div className="profilPageTopSection">
                    <div className="profilePageTopSectionBanner">
                        <img src={channel?.channelBanner} alt="" className="profilePageProfileBannerImage" />
                    </div>
                    <div className="profilePageTopSectionImgContainer">
                        <div className="profilePageTopSectionImg">
                            <img src={user?.avatar} alt="" className="profilePageProfileImage" />
                        </div>
                        <div className="profilePageTopSectionAbout">
                            <div className="profilePageTopSectionAbout-name">
                                {channel?.channelName || user?.userName || "No Channel"}
                            </div>
                            <div className="profilePageTopSectionAbout-info">
                                @{user?.userName} . {content.length} videos
                            </div>
                            <div className="profilePageTopSectionAbout-info">
                                {channel?.channelDescription}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profilePageVideos">
                    <div className="profilePageVideoTitle">Videos &nbsp; <ArrowRightOutlinedIcon sx={{ fontSize: 35 }} /></div>
                    <div className="profilePageVideos-videos">
                        {content.length === 0 ? (
                            <div className="profilePageNoVideosBox">
                                <h2>No videos yet.</h2>
                                <p>This channel hasn’t uploaded any videos.</p>
                            </div>
                        ) : (
                            content.map((item, key) => (
                                <Link to={`/watch/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={item._id}>
                                    <div className="profilePageVideos-videosBlock">
                                        <div className="profilePageVideos-videosThumbnail">
                                            <img src={item?.thumbnail} alt="" className="profilePageVideos-videosThumbnailImg" />
                                        </div>
                                        <div className="profilePageVideos-videosDetails">
                                            <div className="profilePageVideos-videosDetailsName">{item.title}</div>
                                            <div className="profilePageVideos-videosDetailsAbout">{item.createdAt?.slice(0, 10)}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;