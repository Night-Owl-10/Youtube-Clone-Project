import SideBar from "../../component/sideBar/SideBar";
import "./Profile.css"
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../utils/userContext";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../utils/authContext";
import { toast } from "react-toastify";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Profile() {
    const { id } = useParams();
    const [content, setContent] = useState([]);
    const [user, setUser] = useState(null);
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user: currentLoggedUser, channel: currentLoggedChannel, refreshAuthState } = useContext(AuthContext);
    const [showOptions, setShowOptions] = useState("");

    const navigate = useNavigate();

    async function fetchProfileData() {
        try {

            const channelRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/channel/user/${id}`);
            setChannel(channelRes.data.channel);
            console.log("channel", channelRes.data.channel);
        } catch (err) {
            setChannel(null);
        }
        try {

            const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/auth/user/${id}`);
            setUser(userRes.data.user);
        } catch (err) {
            setUser(null);
        }
        try {

            const videoRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/${id}/channel`);
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

    const handleSubscribe = async () => {
        try {
            if (!channel?._id) return;
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/subscribe/${channel._id}`, {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            toast.success(res.data.message);
            fetchProfileData();
        } catch (err) {
            toast.error(err.response?.data?.error || "Error subscribing");
        }
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/deleteVideo/${videoId}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            toast.success(res.data.message);
            fetchProfileData();
        } catch (err) {
            toast.error(err.response?.data?.error || "Error deleting video");
        }
    };

    const handleDeleteChannel = async (channelId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/deleteChannel/${channelId}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            toast.success(res.data.message);
            fetchProfileData();
            await refreshAuthState();
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.error || "Error deleting channel");
        }
    };

    if (!currentLoggedChannel) {
        navigate("/");
    }

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
                            {channel && currentLoggedUser?._id !== channel?.user && (
                                <div className="profilePageTopSectionSubscribe" onClick={handleSubscribe} style={{
                                    backgroundColor: channel?.subscribers?.includes(currentLoggedUser?._id) ? '#3f3f3f' : 'white', color: channel?.subscribers?.includes(currentLoggedUser?._id) ? 'white' : 'black'
                                }}>
                                    {channel?.subscribers?.includes(currentLoggedUser?._id) ? 'Subscribed' : 'Subscribe'}
                                </div>
                            )}
                        </div>
                        {channel && currentLoggedUser?._id === channel?.user && (
                            <div className="profilePageTopSectionDeleteChannel" onClick={() => handleDeleteChannel(channel._id)}>
                                <p className="profilePageTopSectionDeleteChannelText">Delete Channel</p>
                            </div>
                        )}

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
                                <div className="profilePageVideos-videosBlock" style={{ display: 'flex' }} key={item._id}>
                                    <Link to={`/watch/${item._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }} className="profilePageVideos-videosThumbnail">
                                        <img src={item?.thumbnail} alt="" className="profilePageVideos-videosThumbnailImg" />
                                    </Link>
                                    <div className="profilePageVideos-videosDetails-container">
                                        <div className="profilePageVideos-videosDetails">
                                            <div className="profilePageVideos-videosDetailsName">{item.title}</div>
                                            <div className="profilePageVideos-videosDetailsAbout">{item.createdAt?.slice(0, 10)}</div>
                                        </div>
                                        <div className="profilePageVideos-videosDetailsOptionsIcon" onClick={() => { setShowOptions(prev => prev === item._id ? "" : item._id) }}>
                                            <MoreVertIcon sx={{ fontSize: '14px', cursor: 'pointer' }} />
                                            {showOptions === item._id && (
                                                <div className="profilePageVideos-videosDetailsOptionsList">
                                                    <div className="profilePageVideos-videosDetailsOptionsListItem" onClick={() => { handleDeleteVideo(item._id) }}>Delete</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;