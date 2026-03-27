import "./SignIn.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../utils/authContext";

function SignIn() {
    const [signInField, setSignInField] = useState({ "userName": "", "email": "", "password": "" });
    const navigate = useNavigate();
    const { updateAuthState, isSignedIn } = useContext(AuthContext);

    console.log(signInField);

    useEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

    function handleOnchangeInput(event, name) {
        setSignInField({
            ...signInField, [name]: event.target.value
        })
    }

    async function handleSignIn() {
        try {
            console.log("Attempting to sign in with:", signInField);
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signIn`, signInField, { withCredentials: true });
            console.log("Sign in response:", response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user._id);
            localStorage.setItem("userAvatar", response.data.user.avatar);

            console.log("Stored in localStorage:", {
                token: response.data.token,
                userId: response.data.user._id,
                userAvatar: response.data.user.avatar
            });

            updateAuthState(response.data.user);
            navigate("/");
            toast.success(response.data.message);
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
        </div>
    )
}

export default SignIn;