import SideBar from "../../component/SideBar/SideBar";
import "./Profile.css"
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { Link } from "react-router-dom";

function Profile() {

    return(
        <div className="profile">
            <SideBar/>

            <div className="profilePage">

                <div className="profilPageTopSection">
                    <div className="profilePageTopSectionImg">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyRwjwNv52Hi-7yGbiqxnQYKPi-zujLrYkHT0Cu4l25ev_AyWRhxptqJj71mj5WD4Szc&usqp=CAU" alt="" className="profilePageProfileImage" />
                    </div>
                    <div className="profilePageTopSectionAbout">
                        <div className="profilePageTopSectionAbout-name">
                                NodeJs
                        </div>
                        <div className="profilePageTopSectionAbout-info">
                                @User1 . 4 videos
                        </div>
                        <div className="profilePageTopSectionAbout-info">
                                About Section of Channel
                        </div>
                    </div>
                </div>

                <div className="profilePageVideos">
                        <div className="profilePageVideoTitle">Videos &nbsp; <ArrowRightOutlinedIcon sx={{fontSize: 35}}/></div>

                        <div className="profilePageVideos-videos">

                        <Link to="/watch" style={{ textDecoration: 'none', color: 'inherit' }}><div className="profilePageVideos-videosBlock">
                                <div className="profilePageVideos-videosThumbnail">
                                    <img src="https://media.licdn.com/dms/image/v2/D4E12AQEBg943ptCYpg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1686391647921?e=2147483647&v=beta&t=4jKdvoBWv587Ek7xruyjjOaKoMjvAKw3eAN4MKlJZPc" alt="" className="profilePageVideos-videosThumbnailImg" />
                                </div>

                                <div className="profilePageVideos-videosDetails">
                                <div className="profilePageVideos-videosDetailsName">Video Title</div>
                                <div className="profilePageVideos-videosDetailsAbout">Created at 2025-03-17</div>
                            </div>
                            </div></Link>

                        <Link to="/watch" style={{ textDecoration: 'none', color: 'inherit' }}><div className="profilePageVideos-videosBlock">
                                <div className="profilePageVideos-videosThumbnail">
                                    <img src="https://media.licdn.com/dms/image/v2/D4E12AQEBg943ptCYpg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1686391647921?e=2147483647&v=beta&t=4jKdvoBWv587Ek7xruyjjOaKoMjvAKw3eAN4MKlJZPc" alt="" className="profilePageVideos-videosThumbnailImg" />
                                </div>

                                <div className="profilePageVideos-videosDetails">
                                <div className="profilePageVideos-videosDetailsName">Video Title</div>
                                <div className="profilePageVideos-videosDetailsAbout">Created at 2025-03-17</div>
                            </div>
                            </div></Link>

                        <Link to="/watch" style={{ textDecoration: 'none', color: 'inherit' }}><div className="profilePageVideos-videosBlock">
                                <div className="profilePageVideos-videosThumbnail">
                                    <img src="https://media.licdn.com/dms/image/v2/D4E12AQEBg943ptCYpg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1686391647921?e=2147483647&v=beta&t=4jKdvoBWv587Ek7xruyjjOaKoMjvAKw3eAN4MKlJZPc" alt="" className="profilePageVideos-videosThumbnailImg" />
                                </div>

                                <div className="profilePageVideos-videosDetails">
                                <div className="profilePageVideos-videosDetailsName">Video Title</div>
                                <div className="profilePageVideos-videosDetailsAbout">Created at 2025-03-17</div>
                            </div>
                            </div></Link>

                        </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;