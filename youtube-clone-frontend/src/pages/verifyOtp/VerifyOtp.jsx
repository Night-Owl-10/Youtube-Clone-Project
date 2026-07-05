import "./VerifyOtp.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {

    const navigate = useNavigate();

    const [verifyField, setVerifyField] = useState({
        email: localStorage.getItem("verificationEmail") || "",
        otp: ""
    });

    const [resendCooldown, setResendCooldown] = useState(0);
    const [resendLoading, setResendLoading] = useState(false);


    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    async function handleVerifyOtp() {

        if (!verifyField.email || !verifyField.otp) {
            toast.error("Please enter your email and OTP");
            return;
        }

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
                verifyField
            );

            toast.success(response.data.message);

            localStorage.removeItem("verificationEmail");

            navigate("/signIn");

        } catch (err) {

            const message =
                err.response?.data?.error ||
                err.message ||
                "OTP verification failed";

            toast.error(message);
        }
    }

    async function handleResendOtp() {

        if (!verifyField.email) {
            toast.error("Please enter your email address first");
            return;
        }

        setResendLoading(true);

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/resend-verification-otp`,
                { email: verifyField.email }
            );

            toast.success(response.data.message);

            setResendCooldown(30);

        } catch (err) {

            const message =
                err.response?.data?.error ||
                err.message ||
                "Failed to resend OTP";

            toast.error(message);

        } finally {
            setResendLoading(false);
        }
    }

    return (
        <div className="verifyOtpPage">

            <div className="verifyOtpPageBox">

                <div className="verifyOtpPage-title">
                    Verify Email
                </div>

                <div className="verifyOtpForm">

                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="verifyOtpInput"
                        value={verifyField.email}
                        onChange={(e) =>
                            setVerifyField({
                                ...verifyField,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="verifyOtpInput"
                        value={verifyField.otp}
                        onChange={(e) =>
                            setVerifyField({
                                ...verifyField,
                                otp: e.target.value
                            })
                        }
                    />

                </div>

                <div className="verifyOtpBtns">

                    <button
                        className="verifyOtpBtn"
                        onClick={handleVerifyOtp}
                    >
                        Verify OTP
                    </button>

                    <button
                        className="verifyOtpBtn resendOtpBtn"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0 || resendLoading}
                    >
                        {resendLoading
                            ? "Sending…"
                            : resendCooldown > 0
                                ? `Resend OTP (${resendCooldown}s)`
                                : "Resend OTP"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default VerifyOtp;