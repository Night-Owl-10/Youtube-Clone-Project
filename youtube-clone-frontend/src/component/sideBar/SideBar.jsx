import "./SideBar.css"
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MovieIcon from '@mui/icons-material/Movie';
import SensorsIcon from '@mui/icons-material/Sensors';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import userContext from "../../utils/userContext";
import { useContext} from "react";

function SideBar() {

    const data = useContext(userContext);
    return(
        <div className={data.sideBar ? "home-sideBar" : "home-hideSideBar"}>
            <div className="home-sideBar1">
                <div className="home-sidebar-firstOption">
                    <HomeIcon/>
                    <p>Home</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <PlayCircleFilledIcon/>
                    <p>Shorts</p>
                </div>

                <div className="home-sidebar-thirdOption">
                    <SubscriptionsIcon/>
                    <p>Subscription</p>
                </div>
            </div>

            <div className="home-sideBar2">
            <div className="home-sidebar2-firstOption">
                    <p>You</p>
                    <ChevronRightIcon/>
                </div>

                <div className="home-sidebar-firstOption">
                    <HistoryIcon/>
                    <p>History</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <PlaylistPlayIcon/>
                    <p>PlayList</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <SlideshowIcon/>
                    <p>Your videos</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <WatchLaterIcon/>
                    <p>Watch later</p>
                </div>

                <div className="home-sidebar-thirdOption">
                    <ThumbUpIcon/>
                    <p>Liked videos</p>
                </div>
            </div>

            <div className="home-sideBar2">
            <div className="home-sidebar2-firstOption">
                    <p>Explore</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <LibraryMusicIcon/>
                    <p>Music</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <MovieIcon/>
                    <p>Movies</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <SensorsIcon/>
                    <p>Live</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <SportsEsportsIcon/>
                    <p>Gaming</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <NewspaperIcon/>
                    <p>News</p>
                </div>

                <div className="home-sidebar-thirdOption">
                    <EmojiEventsIcon/>
                    <p>Sports</p>
                </div>
            </div>

            <div className="home-sideBar2">
            <div className="home-sidebar-firstOption">
                    <SettingsIcon/>
                    <p>Setting</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <OutlinedFlagIcon/>
                    <p>Report history</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <HelpOutlineIcon/>
                    <p>Help</p>
                </div>

                <div className="home-sidebar-firstOption">
                    <FeedbackIcon/>
                    <p>Send feedback</p>
                </div>
        </div>

        </div>
    )
}

export default SideBar;