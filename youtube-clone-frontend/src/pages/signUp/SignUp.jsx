import "./SignUp.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AuthContext from "../../utils/authContext";
import GoogleIcon from '@mui/icons-material/Google';

function SignUp() {
    const [ulpoadedImageURL, setUlpoadedImageURL] = useState("https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg");
    const [signUpField, setSignUpField] = useState({ "userName": "", "email": "", "password": "", "avatar": ulpoadedImageURL });
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const { isSignedIn } = useContext(AuthContext);
    console.log(signUpField);

    useEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    function handleInputFields(event, name) {
        setSignUpField({
            ...signUpField, [name]: event.target.value
        })
    }

    console.log(signUpField);

    async function uploadImage(e) {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "youtube-clone");
        try {
            //cloudName = "dru7e6cnq"
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, data);
            const imageUrl = response.data.url;
            setUlpoadedImageURL(imageUrl);
            setSignUpField({
                ...signUpField, "avatar": imageUrl
            })
            setLoader(false);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        console.log(files);
    }

    async function handleSignUp() {
        setLoader(true);
        axios.post(`${import.meta.env.VITE_API_URL}/auth/signUp`, signUpField).then((response) => {
            toast.success(response.data.message);
            setLoader(false);
            localStorage.setItem("verificationEmail", signUpField.email);
            navigate("/verify-otp");
        }).catch(err => {
            setLoader(false);
            const message = err.response?.data?.error || err.message || "Sign up failed. Please try again.";
            toast.error(message);
        })
    }

    return (
        <div className="signUpPage">
            <div className="signUpPageBox">
                <div className="signUpPage-title">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Sign Up
                </div>

                <div className="signUpInputs">
                    <input type="text" value={signUpField.userName} onChange={(e) => handleInputFields(e, "userName")} placeholder="UserName" className="signUpInput" />
                    <input type="email" value={signUpField.email} onChange={(e) => handleInputFields(e, "email")} placeholder="E-Mail" className="signUpInput" />
                    <input type="password" value={signUpField.password} onChange={(e) => handleInputFields(e, "password")} placeholder="Password" className="signUpInput" />

                    <div className="uploadAvatar">Upload Avatar:</div>
                    <div className="signUpimageUpload">
                        <input type="file" onChange={(e) => uploadImage(e)} />
                        <div className="signUpimageUploadDiv">
                            <img className="signUpimageDefault" src={ulpoadedImageURL} />
                        </div>
                    </div>

                    <div style={{ color: "white", fontSize: "12px", textAlign: "center", marginTop: "10px" }}>
                        <span style={{ borderTop: "1px solid #444", width: "70px" }}></span>
                        <span>Or Sign in with Google</span>
                        <span style={{ borderTop: "1px solid #444", width: "70px" }}></span>
                    </div>

                    <button
                        onClick={() => {
                            window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
                        }}
                        className="google-btn"
                    >
                        <GoogleIcon />
                        Sign Up with Google
                    </button>

                    {loader && <Box sx={{ display: 'flex', width: "100%", justifyContent: "center", padding: "10px" }}>
                        <CircularProgress />
                    </Box>}

                    <div className="signUpBtns">
                        <div className="signUpBtn" onClick={handleSignUp}>SignUp</div>
                        <Link to="/signIn" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signUpBtn">Sign In</div></Link>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signUpBtn">Cancel</div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;