import "./SignIn.css"
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";
import { useState } from "react";

function SignIn() {
    const [signInField, setSignInField] = useState({"userName":"", "email":"", "password":""});
    console.log(signInField);

    function handleOnchangeInput(event, name) {
        setSignInField({
            ...signInField,[name]:event.target.value
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
                <div className="signInBtns-form">Sign In</div>
              <Link to="/signUp" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signInBtns-form">Sign Up</div></Link>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><div className="signInBtns-form">Cancel</div></Link> 
                </div>
            </div>
            </div>
    )
}

export default SignIn;