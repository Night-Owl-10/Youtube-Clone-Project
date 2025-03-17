import "./Video.css"
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Link } from "react-router-dom";

function Video() {
    return(
        <div className="video">
            <div className="videoSection">
            <div className="youtubeVideo">
                    <video width="400" controls autoPlay className="youtubeVideo-video">
                        <source src={"/Uncharted Drakes Fortune Trailer HD - YouTube [360p].mp4"} type="video/mp4"/>
                        <source src={"/Uncharted Drakes Fortune Trailer HD - YouTube [360p].mp4"} type="video/webm"/>

                        Your Browser does not support the video format.
                    </video>
                    </div>
                    <div className="youtubeVideo-about">
                                <div className="youtubeVideo-title">
                                    {"JavaScript for Beginners"}
                                </div>

                                <div className="youtubeVideo-profileBlock">
                                    <div className="youtubeVideo-profileBlockLeft">
                                    <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}><div className="youtubeVideo-profileBlockLeftImg">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEc9A_S6BPxCDRp5WjMFEfXrpCu1ya2OO-Lw&s" alt="" className="youtubeVideo-profileBlockLeftImage" />
                                        </div></Link>  

                                    <div className="youtubeVideo-subsView">
                                        <div className="youtubeVideo-profileName">
                                            {"User1"}
                                        </div>
                                        <div className="youtubeVideo-profileSubs">
                                            {"2025-03-13"}
                                        </div>
                                    </div>

                                    <div className="subscribeBtnYoutube">Subscribe</div>
                                    </div>

                                    <div className="youtubeVideo-profileBlockRight">
                                        <div className="youtubeVideo-like">
                                            <ThumbUpOutlinedIcon/>
                                            <div className="youtubeVideo-likesCount">{32}</div>
                                        </div>
                                        <div className="youtubeVideo-divider"></div>

                                        <div className="youtubeVideo-like">
                                            <ThumbDownOutlinedIcon/>
                                        </div>
                                    </div>
                                </div>

                                <div className="youtubeVideo-description">
                                    <div>2025-03-17</div>
                                    <div>Complete Javascript Explained</div>
                                </div>
                    </div>

                    <div className="youtubeVideo-commentSection">
                        <div className="youtubeVideo-commentSectionTitle">2 Comments</div>
                    

                    <div className="youtubeVideo-typedComment">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s" alt="" className="youtubeVideo-typedCommentProfile" />
                        <div className="youtubeVideo-addComment">
                            <input type="text" placeholder="Add a Comment" className="addCommentInput"/>
                            <div className="cancelSubmitComment">
                                <div className="cancelComment">Cancel</div>
                                <div className="cancelComment">Comment</div>
                            </div>
                        </div>
                    </div>

                    <div className="youtubeVideo-allComments">

                        <div className="youtubeVideo-typedComment">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s" alt="" className="youtubeVideo-typedCommentProfile" />
                        <div className="youtubeVideo-allCommentsSection">
                            <div className="youtubeVideo-allCommentsSectionHeader">
                                <div className="ChannelName-comment">UserName</div>
                                <div className="commentTimingOthers">2025-03-17</div>
                            </div>

                            <div className="youtubeVideo-allCommentsSectioncomments">
                                MERN Stack
                            </div>
                        </div>
                        </div>

                        <div className="youtubeVideo-typedComment">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s" alt="" className="youtubeVideo-typedCommentProfile" />
                        <div className="youtubeVideo-allCommentsSection">
                            <div className="youtubeVideo-allCommentsSectionHeader">
                                <div className="ChannelName-comment">UserName</div>
                                <div className="commentTimingOthers">2025-03-17</div>
                            </div>

                            <div className="youtubeVideo-allCommentsSectioncomments">
                                MERN Stack
                            </div>
                        </div>
                        </div>
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