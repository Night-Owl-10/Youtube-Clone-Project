import "./PasswordReset.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";

function PasswordReset() {
    const navigate = useNavigate();

    useEffect(() => {
        const resetEmail = localStorage.getItem("resetEmail");

        if (!resetEmail) {
            navigate("/signIn");
        }
    }, [navigate]);

    const [resetField, setResetField] = useState({
        email: localStorage.getItem("resetEmail"),
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    function handleInput(e, field) {
        setResetField({
            ...resetField,
            [field]: e.target.value,
        });
    }

    async function handleResetPassword() {
        if (
            !resetField.email ||
            !resetField.otp ||
            !resetField.newPassword ||
            !resetField.confirmPassword
        ) {
            return toast.error("Please fill all fields");
        }

        if (resetField.newPassword !== resetField.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/verify-reset-otp`,
                {
                    email: resetField.email,
                    otp: resetField.otp,
                    newPassword: resetField.newPassword,
                }
            );

            toast.success(response.data.message);
            localStorage.removeItem("resetEmail");

            setTimeout(() => {
                navigate("/signIn");
            }, 1500);
        } catch (err) {
            const message =
                err.response?.data?.error ||
                err.message ||
                "Password reset failed";

            toast.error(message);
        }
    }

    return (
        <div className="passwordResetPage">
            <div className="passwordResetBox">

                <div className="passwordResetTitle">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    <h2>Reset Password</h2>
                </div>

                <div className="passwordResetInputs">

                    <input
                        type="email"
                        placeholder="Email"
                        value={resetField.email}
                        readOnly
                    />

                    <input
                        type="text"
                        placeholder="OTP"
                        value={resetField.otp}
                        onChange={(e) => handleInput(e, "otp")}
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={resetField.newPassword}
                        onChange={(e) => handleInput(e, "newPassword")}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={resetField.confirmPassword}
                        onChange={(e) => handleInput(e, "confirmPassword")}
                    />

                    <button onClick={handleResetPassword}>
                        Reset Password
                    </button>

                </div>

            </div>
        </div>
    );
}

export default PasswordReset;