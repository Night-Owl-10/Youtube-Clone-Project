import "./Video.css"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from "react-toastify";
import { useContext, useRef } from "react";
import AuthContext from "../../utils/authContext";

function Video() {
    const { user } = useContext(AuthContext);
    const [videoComment, setVideoComment] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [comments, setComments] = useState([]);
    const [optionsCommentId, setOptionsCommentId] = useState("");
    const [refetch, setRefetch] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [editCommentText, setEditCommentText] = useState("");
    const { id } = useParams();
    console.log(id);

    async function fetchVideoById() {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response) => {
            console.log(response.data.video);
            setData(response.data.video);
            setVideoUrl(response?.data?.video?.videoLink);
        }).catch(err => {
            console.log(err);
        })
    }

    const hasTrackedView = useRef(false);

    const handleVideoViews = async () => {
        if (hasTrackedView.current) return;
        hasTrackedView.current = true;
        try {
            await axios.put(`http://localhost:4000/api/view/${id}`);
        } catch (err) {
            console.log("Error updating views", err);
        }
    };

    const handleLike = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/api/like/${id}`, {}, { withCredentials: true });
            toast.success(res.data.message);
            setRefetch(prev => !prev);
        } catch (err) {
            toast.error(err.response?.data?.error || "Error liking video");
        }
    };

    const handleDislike = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/api/dislike/${id}`, {}, { withCredentials: true });
            toast.success(res.data.message);
            setRefetch(prev => !prev);
        } catch (err) {
            toast.error(err.response?.data?.error || "Error disliking video");
        }
    };

    const handleSubscribe = async () => {
        try {
            if (!data?.channel?._id) return;
            const res = await axios.put(`http://localhost:4000/api/subscribe/${data.channel._id}`, {}, { withCredentials: true });
            toast.success(res.data.message);
            setRefetch(prev => !prev);
        } catch (err) {
            toast.error(err.response?.data?.error || "Error subscribing");
        }
    };

    useEffect(() => {
        handleVideoViews();
    }, [id]);

    async function getCommentByVideoId() {
        await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response) => {
            console.log("response", response.data.comments);
            setComments(response.data.comments);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [refetch])

    async function handleComment() {
        const body = {
            "message": videoComment,
            "video": id
        }
        await axios.post("http://localhost:4000/commentApi/comment", body, { withCredentials: true }).then((response) => {
            console.log(response)
            setVideoComment("");
            setRefetch(prev => !prev);
        }).catch(err => {
            toast.error("User must have a channel to add comments");
        })
    }

    function handleShowOptions(commentId) {
        setOptionsCommentId(prev => prev === commentId ? "" : commentId);
    }

    async function handleDeleteComment(commentId) {
        await axios.delete(`http://localhost:4000/commentApi/comment/${commentId}`, { withCredentials: true }).then((response) => {
            console.log(response);
            setRefetch(prev => !prev);
            setOptionsCommentId("");
            toast.success(response.data.message);
        }).catch(err => {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
        })
    }

    function handleToggleEdit(comment) {
        setEditComment(prev => prev === comment._id ? "" : comment._id);
        setEditCommentText(comment.message);
    }

    async function handleEditComment(commentId, commentMessage) {
        const body = {
            "message": commentMessage,
            "commentId": commentId
        }
        await axios.put("http://localhost:4000/commentApi/comment", body, { withCredentials: true }).then((response) => {
            console.log(response);
            setRefetch(prev => !prev);
            setOptionsCommentId("");
            setEditComment("");
            toast.success(response.data.message);
        }).catch(err => {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
        })
    }

    return (
        <div className="video">
            <div className="videoSection">
                <div className="youtubeVideo">
                    {data && <video width="400" controls autoPlay className="youtubeVideo-video">
                        <source src={videoUrl} type="video/mp4" />
                        <source src={videoUrl} type="video/webm" />

                        Your Browser does not support the video format.
                    </video>}
                </div>
                <div className="youtubeVideo-about">
                    <div className="youtubeVideo-title">
                        {data?.title}
                    </div>

                    <div className="youtubeVideo-profileBlock">
                        <div className="youtubeVideo-profileBlockLeft">
                            <Link to={`/user/${data?.user?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}><div className="youtubeVideo-profileBlockLeftImg">
                                <img src={data?.user?.avatar} alt="" className="youtubeVideo-profileBlockLeftImage" />
                            </div></Link>

                            <div className="youtubeVideo-subsView">
                                <div className="youtubeVideo-profileName">
                                    {data?.channel?.channelName}
                                </div>
                                <div className="youtubeVideo-profileSubs">
                                    {data?.channel?.subscribers?.length || 0} subscribers
                                </div>
                            </div>

                            <div className="subscribeBtnYoutube" onClick={handleSubscribe} style={{ cursor: 'pointer', backgroundColor: data?.channel?.subscribers?.includes(user?._id) ? '#3f3f3f' : 'white', color: data?.channel?.subscribers?.includes(user?._id) ? 'white' : 'black' }}>{data?.channel?.subscribers?.includes(user?._id) ? 'Subscribed' : 'Subscribe'}</div>
                        </div>

                        <div className="youtubeVideo-profileBlockRight">
                            <div className="youtubeVideo-like" onClick={handleLike} style={{ cursor: 'pointer', color: data?.like?.includes(user?._id) ? '#3f3f3f' : 'inherit' }}>
                                <ThumbUpOutlinedIcon sx={{ fontSize: "20px" }} />
                                <div className="youtubeVideo-likesCount">{data?.like?.length || 0}</div>
                            </div>
                            <div className="youtubeVideo-divider"></div>

                            <div className="youtubeVideo-like" onClick={handleDislike} style={{ cursor: 'pointer', color: data?.dislike?.includes(user?._id) ? '#3f3f3f' : 'inherit' }}>
                                <div className="youtubeVideo-likesCount">{data?.dislike?.length || 0}</div>
                                <ThumbDownOutlinedIcon sx={{ fontSize: "20px" }} />
                            </div>
                        </div>
                    </div>

                    <div className="youtubeVideo-description">
                        <div>{data?.views || 0} views &nbsp; {data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>

                <div className="youtubeVideo-commentSection">
                    <div className="youtubeVideo-commentSectionTitle">{comments.length} Comments</div>


                    <div className="youtubeVideo-typedComment">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s" alt="" className="youtubeVideo-typedCommentProfile" />
                        <div className="youtubeVideo-addComment">
                            <input type="text" value={videoComment} onChange={(e) => setVideoComment(e.target.value)} placeholder="Add a Comment" className="addCommentInput" />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment">Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>

                    <div className="youtubeVideo-allComments">

                        {
                            comments.map((item, index) => {
                                return (
                                    <div className="youtubeVideo-typedComment">
                                        <img src={item?.user?.avatar} alt="" className="youtubeVideo-typedCommentProfile" />
                                        <div className="youtubeVideo-allCommentsSection">
                                            <div className="youtubeVideo-allCommentsSectionHeader">
                                                <div className="ChannelName-comment">{item?.channel?.channelName}</div>
                                                <div className="commentTimingOthers">{item?.createdAt.slice(0, 10)}</div>
                                            </div>

                                            {editComment === item._id ? <div className="youtubeVideo-allCommentsSectioncomments">
                                                <input type="text" value={editCommentText} onChange={(e) => setEditCommentText(e.target.value)} className="addCommentInput" />
                                                <div className="cancelSubmitComment">
                                                    <div className="submitComment" onClick={() => setEditComment("")}><CloseIcon sx={{ fontSize: '18px' }} /></div>
                                                    <div className="submitComment" onClick={() => handleEditComment(item._id, editCommentText)}><CheckIcon sx={{ fontSize: '18px' }} /></div>
                                                </div>
                                            </div> : <div className="youtubeVideo-allCommentsSectioncomments">
                                                {item?.message}
                                            </div>}
                                        </div>
                                        <div className="youtubeVideo-allCommentsSectionOptions" onClick={() => handleShowOptions(item._id)}>
                                            <MoreVertIcon sx={{ fontSize: '18px' }} />
                                            {
                                                optionsCommentId === item._id && (
                                                    <div className="youtubeVideo-allCommentsSectionOptionsList">
                                                        <div className="youtubeVideo-allCommentsSectionOptionsListItem" onClick={() => handleToggleEdit(item)}>Edit</div>
                                                        <div className="youtubeVideo-allCommentsSectionOptionsListItem" onClick={() => handleDeleteComment(item._id)}>Delete</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                )
                            })
                        }

                    </div>
                </div>
            </div>

            <div className="videoSuggestions">

                <div className="videoSuggestionsBlock">
                    <div className="videoSuggestionsThumbnail">
                        <img src="https://community-cdn-digitalocean-com.global.ssl.fastly.net/uCcwj4q1e8Tx91Ce5En11NdE" alt="" className="videoSuggestiosThumbnailImg" />
                    </div>
                    <div className="videoSuggestionsAbout">
                        <div className="videoSuggestionAbout-title">Complete MongoDB course with Mongosh and MongDB Compass</div>
                        <div className="videoSuggestionAbout-Profile">MongoDB</div>
                        <div className="videoSuggestionAbout-Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="videoSuggestionsThumbnail">
                        <img src="https://community-cdn-digitalocean-com.global.ssl.fastly.net/uCcwj4q1e8Tx91Ce5En11NdE" alt="" className="videoSuggestiosThumbnailImg" />
                    </div>
                    <div className="videoSuggestionsAbout">
                        <div className="videoSuggestionAbout-title">Complete MongoDB course with Mongosh and MongDB Compass</div>
                        <div className="videoSuggestionAbout-Profile">MongoDB</div>
                        <div className="videoSuggestionAbout-Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="videoSuggestionsThumbnail">
                        <img src="https://community-cdn-digitalocean-com.global.ssl.fastly.net/uCcwj4q1e8Tx91Ce5En11NdE" alt="" className="videoSuggestiosThumbnailImg" />
                    </div>
                    <div className="videoSuggestionsAbout">
                        <div className="videoSuggestionAbout-title">Complete MongoDB course with Mongosh and MongDB Compass</div>
                        <div className="videoSuggestionAbout-Profile">MongoDB</div>
                        <div className="videoSuggestionAbout-Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="videoSuggestionsThumbnail">
                        <img src="https://community-cdn-digitalocean-com.global.ssl.fastly.net/uCcwj4q1e8Tx91Ce5En11NdE" alt="" className="videoSuggestiosThumbnailImg" />
                    </div>
                    <div className="videoSuggestionsAbout">
                        <div className="videoSuggestionAbout-title">Complete MongoDB course with Mongosh and MongDB Compass</div>
                        <div className="videoSuggestionAbout-Profile">MongoDB</div>
                        <div className="videoSuggestionAbout-Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="videoSuggestionsThumbnail">
                        <img src="https://community-cdn-digitalocean-com.global.ssl.fastly.net/uCcwj4q1e8Tx91Ce5En11NdE" alt="" className="videoSuggestiosThumbnailImg" />
                    </div>
                    <div className="videoSuggestionsAbout">
                        <div className="videoSuggestionAbout-title">Complete MongoDB course with Mongosh and MongDB Compass</div>
                        <div className="videoSuggestionAbout-Profile">MongoDB</div>
                        <div className="videoSuggestionAbout-Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="videoSuggestionsThumbnail">
                        <img src="https://community-cdn-digitalocean-com.global.ssl.fastly.net/uCcwj4q1e8Tx91Ce5En11NdE" alt="" className="videoSuggestiosThumbnailImg" />
                    </div>
                    <div className="videoSuggestionsAbout">
                        <div className="videoSuggestionAbout-title">Complete MongoDB course with Mongosh and MongDB Compass</div>
                        <div className="videoSuggestionAbout-Profile">MongoDB</div>
                        <div className="videoSuggestionAbout-Profile">136k views . 1 day ago</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video;