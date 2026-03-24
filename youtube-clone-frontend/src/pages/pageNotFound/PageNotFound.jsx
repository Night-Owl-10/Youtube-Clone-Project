import "./PageNotFound.css";
import { useRouteError, Link } from "react-router-dom";


function PageNotFound() {
    const error = useRouteError();
    console.log(error);
    return (
        <div className="pageNotFound">
            <div className="pageNotFoundImageContainer">
                <img src="sad-youtube.png" alt="page not found" className="pageNotFoundImage" />
            </div>
            <div className="pageNotFoundText">
                <h1>{error.status}</h1>
                <h1>{error.statusText}</h1>
            </div>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><button className="pageNotFoundBtn">Go to Home</button></Link>
        </div>
    );
}

export default PageNotFound;