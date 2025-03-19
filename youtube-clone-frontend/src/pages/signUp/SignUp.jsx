import "./SignUp.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
    const [ulpoadedImageURL, setUlpoadedImageURL] = useState("https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg");
    const [signUpField, setSignUpField] = useState({"userName":"", "email":"", "password":"", "avatar":ulpoadedImageURL});
    console.log(signUpField);

    function handleInputFields(event, name) {
        setSignUpField({
            ...signUpField,[name]:event.target.value
        })
    }

    console.log(signUpField);

    async function uploadImage(e) {
            const files = e.target.files;
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
                console.log(response);
            } catch(err) {
            console.log(err);
            }
            console.log(files);
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

                <div className="uploadAvatar">Upload Avatar:</div>
                <div className="signUpimageUpload">
                    <input type="file" onChange={(e) => uploadImage(e)} />
                    <div className="signUpimageUploadDiv">
                        <img className="signUpimageDefault" src={ulpoadedImageURL}/>
                    </div>
                </div>

                <div className="signUpBtns">
                    <div className="signUpBtn">SignUp</div>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signUpBtn">Cancel</div></Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;