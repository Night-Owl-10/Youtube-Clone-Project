import "./SignIn.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";


function SignIn({handleCancelChannelPage}) {
    const [signInField, setSignInField] = useState({"userName":"", "email":"", "password":""});
    const navigate = useNavigate();
    console.log(signInField);

    function handleOnchangeInput(event, name) {
        setSignInField({
            ...signInField,[name]:event.target.value
        })
    }

    async function handleSignIn() {
            axios.post("http://localhost:4000/auth/signIn", signInField, {withCredentials: true}).then((response) => {
                console.log(response)
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user._id);
                localStorage.setItem("userAvatar", response.data.user.avatar);
                window.location.reload();
            }).catch(err => {
                toast.error("Invalid Credentials")
                console.log(err)
            })
    }

    return (
        <div className="signInPage">
            <div className="signInPageBox">
            <div className="signInPage-title">
                    <YouTubeIcon sx={{fontSize: "54px", color: "red"}}/>
                    Sign In
                </div>

            <div className="signInPageForm">
                <div className="signInFormUserName">
                    <input type="text" value={signInField.userName} onChange={(e) => handleOnchangeInput(e, "userName")} placeholder="UserName" className="signInUserName"/>
                </div>

                <div className="signInFormUserName">
                    <input type="email" value={signInField.email}  onChange={(e) => handleOnchangeInput(e, "email")} placeholder="E-Mail" className="signInUserName"/>
                </div>

                <div className="signInFormUserName">
                    <input type="password" value={signInField.password} onChange={(e) => handleOnchangeInput(e, "password")} placeholder="Password" className="signInUserName"/>
                </div>

            </div>

            <div className="signInBtns">
                <div className="signInBtns-form" onClick={handleSignIn}>Sign In</div>
              <Link to="/signUp" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signInBtns-form"onClick={() => handleCancelChannelPage()}>Sign Up</div></Link>
              <div className="signInBtns-form" onClick={() => handleCancelChannelPage()}>Cancel</div> 
                </div>
            </div>
            <ToastContainer/>
            </div>
    )
}

export default SignIn;