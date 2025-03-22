import "./Video.css"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Video() {
    const [videoComment, setVideoComment] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [comments, setComments] = useState([]);
    const {id} = useParams();
    console.log(videoComment);

    async function fetchVideoById() {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response) => {
            console.log(response.data.video);
            setData(response.data.video);
            setVideoUrl(response?.data?.video?.videoLink);
        }).catch(err => {
            console.log(err);
          })
    }

    async function getCommentByVideoId() {
        await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response) => {
            console.log(response);
            setComments(response.data.comments);
        }).catch(err => {
            console.log(err);
          })
    }
    
    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [])

    async function handleComment() {
        const body = {
            "message": videoComment,
            "video": id
        }
        await axios.post("http://localhost:4000/commentApi/comment", body, {withCredentials: true}).then((response) => {
            console.log(response)
            const newComment = response.data.comment;
            setComments([...comments, newComment]);
            setVideoComment("");
            window.location.reload();
        }).catch(err => {
            toast.error("Please SignIn first");
        })
    }

    return(
        <div className="video">
            <div className="videoSection">
            <div className="youtubeVideo">
                    {data && <video width="400" controls autoPlay className="youtubeVideo-video">
                        <source src={videoUrl} type="video/mp4"/>
                        <source src={videoUrl} type="video/webm"/>

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
                                            {data?.user?.channelName}
                                        </div>
                                        <div className="youtubeVideo-profileSubs">
                                            {data?.user?.createdAt.slice(0, 10)}
                                        </div>
                                    </div>

                                    <div className="subscribeBtnYoutube">Subscribe</div>
                                    </div>

                                    <div className="youtubeVideo-profileBlockRight">
                                        <div className="youtubeVideo-like">
                                            <ThumbUpOutlinedIcon/>
                                            <div className="youtubeVideo-likesCount">{data?.like}</div>
                                        </div>
                                        <div className="youtubeVideo-divider"></div>

                                        <div className="youtubeVideo-like">
                                            <ThumbDownOutlinedIcon/>
                                        </div>
                                    </div>
                                </div>

                                <div className="youtubeVideo-description">
                                    <div>{data?.createdAt.slice(0, 10)}</div>
                                    <div>{data?.description}</div>
                                </div>
                    </div>

                    <div className="youtubeVideo-commentSection">
                        <div className="youtubeVideo-commentSectionTitle">{comments.length} Comments</div>
                    

                    <div className="youtubeVideo-typedComment">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s" alt="" className="youtubeVideo-typedCommentProfile" />
                        <div className="youtubeVideo-addComment">
                            <input type="text" value={videoComment} onChange={(e) => {setVideoComment(e.target.value)}} placeholder="Add a Comment" className="addCommentInput"/>
                            <div className="cancelSubmitComment">
                                <div className="cancelComment">Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>

                    <div className="youtubeVideo-allComments">

                        {
                            comments.map((item, index) => {
                                return(
                                    <div className="youtubeVideo-typedComment">
                        <img src={item?.user?.avatar} alt="" className="youtubeVideo-typedCommentProfile" />
                        <div className="youtubeVideo-allCommentsSection">
                            <div className="youtubeVideo-allCommentsSectionHeader">
                                <div className="ChannelName-comment">{item?.user?.channelName}</div>
                                <div className="commentTimingOthers">{item?.createdAt.slice(0, 10)}</div>
                            </div>

                            <div className="youtubeVideo-allCommentsSectioncomments">
                                {item?.message}
                            </div>
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
                        <ToastContainer/>
            </div>
    )
}

export default Video;