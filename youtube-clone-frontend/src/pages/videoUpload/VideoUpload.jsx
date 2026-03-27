import { Link, useNavigate } from "react-router-dom";
import "./VideoUpload.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AuthContext from "../../utils/authContext";
import { toast } from "react-toastify";

function VideoUpload() {
    const categories = ["All", "Music", "Movies", "Games", "News", "Sports", "Shopping", "Courses", "Fashion & Beauty", "Podcast", "Educational", "Trailers", "Live", "Documentry", "Animals", "Social Media"];
    const [videoInputField, setVideoInputField] = useState({ "title": "", "description": "", "videoLink": "", "thumbnail": "", "category": "" });
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    function handleOnchangeInput(event, name) {
        setVideoInputField({
            ...videoInputField, [name]: event.target.value
        })
    }

    async function uploadImage(e, type) {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "youtube-clone");
        try {
            //cloudName = "dru7e6cnq"
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/${type}/upload`, data);
            const url = response.data.url;
            let val = type === "image" ? "thumbnail" : "videoLink";
            setVideoInputField({
                ...videoInputField, [val]: url
            })

            setLoader(false);

            console.log(url);

            console.log(response);
        } catch (err) {
            setLoader(false);
            console.log(err);
        }
        console.log(files);
    }

    console.log(videoInputField);

    useEffect(() => {
        if (!auth.isSignedIn) {
            navigate("/");
        }
    }, [auth.isSignedIn, navigate]);


    if (auth.isSignedIn && !auth.channel) {
        return (
            <div className="videoUpload">
                <div className="uploadBox">
                    <div className="uploadVideo-title">
                        <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                        Studios
                    </div>
                    <div className="no-channel-message">
                        <h2>Create a channel to upload videos</h2>
                        <p>You need a channel before you can upload videos. Go to your profile and create a channel.</p>
                    </div>
                </div>
            </div>
        );
    }

    async function handleSubmitFunction() {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/video`, videoInputField, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            console.log(response);
            toast.success(response.data.message);
            navigate("/");
        }).catch(err => {
            setLoader(false);
            console.log(err);
            toast.error(err.response?.data?.error || "Video upload failed");
        })
    }

    return (
        <div className="videoUpload">
            <div className="uploadBox">
                <div className="uploadVideo-title">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Studios
                </div>

                <div className="uploadForm">
                    <div className="uploadVideoBlock">
                        <p>Upload Video:</p>
                        <input type="file" accept="video/mp4, video/webm, video/*" onChange={(e) => uploadImage(e, "video")} />
                    </div>
                    <input type="text" value={videoInputField.title} onChange={(e) => handleOnchangeInput(e, "title")} placeholder="Video Title" className="uploadFormInput" />
                    <select value={videoInputField.category} onChange={(e) => handleOnchangeInput(e, "category")} className="uploadFormInput">
                        <option value="" disabled>Select Video Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input type="text" value={videoInputField.description} onChange={(e) => handleOnchangeInput(e, "description")} placeholder="Video Description" className="uploadFormInput" />
                    <div className="uploadThumbnailBlock">
                        <p>Upload Thumbnail:</p>
                        <input type="file" accept="image/*" onChange={(e) => uploadImage(e, "image")} /></div>
                </div>

                {
                    loader && <Box sx={{ display: 'flex', width: "100%", justifyContent: "center", padding: "10px" }}>
                        <CircularProgress />
                    </Box>
                }

                <div className="uploadBtns">
                    <div className="uploadBtns-form" onClick={handleSubmitFunction}>Upload</div>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><div className="uploadBtns-form">Cancel</div></Link>
                </div>
            </div>
        </div>
    )
}

export default VideoUpload;