import "./SignUp.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function SignUp() {
    const [ulpoadedImageURL, setUlpoadedImageURL] = useState("https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg");
    const [signUpField, setSignUpField] = useState({"userName":"", "email":"", "password":"", "channelName":"", "channelDescription":"" ,"avatar":ulpoadedImageURL});
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    console.log(signUpField);

    function handleInputFields(event, name) {
        setSignUpField({
            ...signUpField,[name]:event.target.value
        })
    }

    console.log(signUpField);

    async function uploadImage(e) {
            setLoader(true);
            const files = e.target.files;
            console.log(files);
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "youtube-clone");
            try {
                //cloudName = "dru7e6cnq"
                const response = await axios.post("https://api.cloudinary.com/v1_1/dru7e6cnq/image/upload", data);
                const imageUrl = response.data.url;
                setUlpoadedImageURL(imageUrl);
                setSignUpField({
                    ...signUpField,"avatar":imageUrl
                })
                setLoader(false);
                console.log(response);
            } catch(err) {
            console.log(err);
            }
            console.log(files);
    }

    async function handleSignUp() {
            setLoader(true);
            axios.post("http://localhost:4000/auth/signUp", signUpField).then((response) => {
                console.log(response)
                toast.success(response.data.message);
                setLoader(false);
                navigate("/");
            }).catch(err => {
                console.log(err)
                setLoader(false);
                toast.error(err)
              })
    }

    return(
        <div className="signUpPage">
            <div className="signUpPageBox">
                <div className="signUpPage-title">
                    <YouTubeIcon sx={{fontSize: "54px", color: "red"}}/>
                    Sign Up
                </div>

                <div className="signUpInputs">
                <input type="text" value={signUpField.userName} onChange={(e) => handleInputFields(e, "userName")} placeholder="UserName" className="signUpInput"/>
                <input type="email" value={signUpField.email} onChange={(e) => handleInputFields(e, "email")} placeholder="E-Mail" className="signUpInput"/>
                <input type="password" value={signUpField.password} onChange={(e) => handleInputFields(e, "password")} placeholder="Password" className="signUpInput"/>
                <input type="text" value={signUpField.channelName} onChange={(e) => handleInputFields(e, "channelName")} placeholder="Channel Name" className="signUpInput"/>
                <input type="text" value={signUpField.channelDescription} onChange={(e) => handleInputFields(e, "channelDescription")} placeholder="Channel Description" className="signUpInput"/>

                <div className="uploadAvatar">Upload Avatar:</div>
                <div className="signUpimageUpload">
                    <input type="file" onChange={(e) => uploadImage(e)} />
                    <div className="signUpimageUploadDiv">
                        <img className="signUpimageDefault" src={ulpoadedImageURL}/>
                    </div>
                </div>

                {loader && <Box sx={{ display: 'flex', width: "100%", justifyContent: "center", padding:"10px" }}>
                    <CircularProgress />
                </Box>}

                <div className="signUpBtns">
                    <div className="signUpBtn" onClick={handleSignUp}>SignUp</div>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signUpBtn">Cancel</div></Link>
                </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default SignUp;