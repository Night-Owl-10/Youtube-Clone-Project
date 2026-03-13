import "./SignIn.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import AuthContext from "../../utils/authContext";

function SignIn() {
    const [signInField, setSignInField] = useState({ "userName": "", "email": "", "password": "" });
    const navigate = useNavigate();
    const { updateAuthState } = useContext(AuthContext);

    console.log(signInField);

    function handleOnchangeInput(event, name) {
        setSignInField({
            ...signInField, [name]: event.target.value
        })
    }

    async function handleSignIn() {
        try {
            console.log("Attempting to sign in with:", signInField);
            const response = await axios.post("http://localhost:4000/auth/signIn", signInField, { withCredentials: true });
            console.log("Sign in response:", response.data);

            // Store data in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user._id);
            localStorage.setItem("userAvatar", response.data.user.avatar);

            console.log("Stored in localStorage:", {
                token: response.data.token,
                userId: response.data.user._id,
                userAvatar: response.data.user.avatar
            });

            // Update auth context
            updateAuthState(response.data.user);

            navigate("/");
        } catch (err) {
            console.error("Sign in error:", err);
            toast.error(err.response?.data?.error || "Sign in failed");
        }
    }

    return (
        <div className="signInPage">
            <div className="signInPageBox">
                <div className="signInPage-title">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Sign In
                </div>

                <div className="signInPageForm">
                    <div className="signInFormUserName">
                        <input type="text" value={signInField.userName} onChange={(e) => handleOnchangeInput(e, "userName")} placeholder="UserName" className="signInUserName" />
                    </div>

                    <div className="signInFormUserName">
                        <input type="email" value={signInField.email} onChange={(e) => handleOnchangeInput(e, "email")} placeholder="E-Mail" className="signInUserName" />
                    </div>

                    <div className="signInFormUserName">
                        <input type="password" value={signInField.password} onChange={(e) => handleOnchangeInput(e, "password")} placeholder="Password" className="signInUserName" />
                    </div>

                </div>

                <div className="signInBtns">
                    <div className="signInBtns-form" onClick={handleSignIn}>Sign In</div>
                    <Link to="/signUp" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signInBtns-form">Sign Up</div></Link>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signInBtns-form">Cancel</div></Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignIn;