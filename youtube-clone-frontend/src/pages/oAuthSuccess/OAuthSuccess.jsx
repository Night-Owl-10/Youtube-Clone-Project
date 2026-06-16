import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./OAuthSuccess.css";
import AuthContext from "../../utils/authContext";
import { useContext } from "react";

function OAuthSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { updateAuthState } = useContext(AuthContext);

    useEffect(() => {
        const handleOAuth = async () => {
            try {
                const token = searchParams.get("token");

                if (token) {
                    localStorage.setItem("token", token);

                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })

                    if (res.data.user) {
                        localStorage.setItem("userId", res.data.user._id);
                        localStorage.setItem("userAvatar", res.data.user.avatar);

                        updateAuthState(res.data.user);
                    }

                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                } else {
                    navigate("/signIn");
                }
            } catch (err) {
                console.log(err);
                navigate("/signIn");
            }
        }
        handleOAuth();
    }, [navigate, searchParams, updateAuthState]);

    return (
        <div className="oauth-success">
            <div className="loader"></div>
            <h2>Signing you in...</h2>
        </div>
    );
}

export default OAuthSuccess;