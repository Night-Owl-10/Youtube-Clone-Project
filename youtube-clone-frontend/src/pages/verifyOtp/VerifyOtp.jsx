import "./VerifyOtp.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("verificationEmail")) {
            navigate("/signUp");
        }
    }, [navigate]);


    const [verifyField, setVerifyField] = useState({
        email: localStorage.getItem("verificationEmail") || "",
        otp: ""
    });

    async function handleVerifyOtp() {

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

                </div>

            </div>

        </div>
    );
}

export default VerifyOtp;