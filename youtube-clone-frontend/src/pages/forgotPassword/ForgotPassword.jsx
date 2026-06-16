import "./ForgotPassword.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    async function handleForgotPassword() {

        if (!email) {
            return toast.error("Please enter your email");
        }

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
                { email }
            );

            toast.success(response.data.message);

            localStorage.setItem(
                "resetEmail",
                response.data.email
            );

            navigate("/password-reset");

        } catch (err) {

            const message =
                err.response?.data?.error ||
                err.message ||
                "Failed to send OTP";

            toast.error(message);
        }
    }

    return (
        <div className="forgotPasswordPage">

            <div className="forgotPasswordBox">

                <div className="forgotPasswordTitle">
                    <YouTubeIcon
                        sx={{
                            fontSize: "54px",
                            color: "red"
                        }}
                    />

                    <h2>Forgot Password</h2>
                </div>

                <div className="forgotPasswordInputs">

                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <button
                        onClick={handleForgotPassword}
                    >
                        Send OTP
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;